import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { connectDb } from "./config/connectdb.js";
import userRouter from "./routes/userRoutes.js";
import orderModel from "./models/OrderPlace.js";
import momentTZ from "moment-timezone";
import moment from "moment";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(morgan("dev"));
connectDb(DATABASE_URL);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// //////////////////////////////////////////////
// ///////// Dialogflow Integration..   ////////
// request object
const webhookReq = {
  responseId: "response-id",
  session: "projects/project-id/agent/sessions/session-id",
  queryResult: {
    queryText: "End-user expression",
    parameters: {
      "param-name": "param-value",
    },
    allRequiredParamsPresent: true,
    fulfillmentText: "Response configured for matched intent",
    fulfillmentMessages: [
      {
        text: {
          text: ["Response configured for matched intent"],
        },
      },
    ],
    outputContexts: [
      {
        name: "projects/project-id/agent/sessions/session-id/contexts/context-name",
        lifespanCount: 5,
        parameters: {
          "param-name": "param-value",
        },
      },
    ],
    intent: {
      name: "projects/project-id/agent/intents/intent-id",
      displayName: "matched-intent-name",
    },
    intentDetectionConfidence: 1,
    diagnosticInfo: {},
    languageCode: "en",
  },
  originalDetectIntentRequest: {},
};



app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    const intentName = body.queryResult.intent.displayName;
    const params = body.queryResult.parameters;

    if (intentName === "placeOrder") {
      console.log("collected params: ", params);
      console.log("collected params: ", params.person);

      const newOrder = new orderModel({
        orderName: params.person.name,
        pizzaSize: params.pizzaSize,
        pizzaFlavour: params.pizzaFlavour,
        qty: params.qty,
      });
      const savedOrder = await newOrder.save();
      console.log(`New order added:`, savedOrder);

      let responseText = `you said ${params.qty} ${params.pizzaSize} ${params.pizzaFlavour} pizza,  your pizza is on the way, this is came from webhook server`;

      res.send({
        fulfillmentMessages: [
          {
            text: {
              text: [responseText],
            },
          },
        ],
        outputContexts: [
          {
            name: `${req.body.session}/contexts/coolDrinkAsk`,
            lifespanCount: 2,
            parameters: {
              "param-name": "param-value",
            },
          },
        ],
      });
    } else if (intentName === "checkOrderStatus") {
      let responseText = "";

      const recentOrders = await orderModel
        .find({})
        .sort({ createdOn: -1 })
        .limit(15);

      let latestPendingOrders = [];
      for (let i = 0; i < recentOrders.length; i++) {
        if (recentOrders[i].status === "pending") {
          latestPendingOrders.push(recentOrders[i]);
        } else {
          break;
        }
      }

      if (latestPendingOrders.length === 0) {
        responseText = `${recentOrders[0].orderName}, your order for ${
          recentOrders[0].qty
        } ${recentOrders[0].pizzaSize} ${
          recentOrders[0].pizzaFlavour
        } pizza is ${recentOrders[0].status} ${moment(
          recentOrders[0].createdOn
        ).fromNow()}`;
      } else {
        responseText += `${latestPendingOrders[0].orderName}, you have ${
          latestPendingOrders.length
        } pending ${latestPendingOrders.length > 1 ? "orders." : "order"}`;

        latestPendingOrders.map((eachOrder, i) => {
          if (latestPendingOrders.length > 1) {
            responseText += ` order number ${i + 1},`;
          } else {
            responseText += ` for`;
          }

          responseText += ` ${eachOrder.qty} ${eachOrder.pizzaSize} ${eachOrder.pizzaFlavour} pizza,`;
        });

        responseText += ` please be patient your order will be delivered soon.`;
      }

      res.send({
        fulfillmentMessages: [
          {
            text: {
              text: [responseText],
            },
          },
        ],
      });
    } else {
      res.send({
        fulfillmentMessages: [
          {
            text: {
              text: ["sorry webhook dont know answer for this intent"],
            },
          },
        ],
      });
    }
  } catch (error) {
    console.log(error, "server error!");
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// authentication api's
app.use("/api/user/", userRouter);
app.use("/test", (req, res) => res.send("test ngrok server"));

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
