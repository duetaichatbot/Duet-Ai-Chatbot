import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { connectDb } from "./config/connectdb.js";
import userRouter from "./routes/userRoutes.js";
import orderModel from "./models/OrderPlace.js";
import messageModel from "./models/Message.js";
import feedbackRouter from './routes/feedback.js';


import momentTZ from "moment-timezone";
import moment from "moment";
import axios from "axios";
import dialogflow from 'dialogflow';
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

app.post("/message", async (req, res) => {
  try {
    const body = req.body;
    if (!body.query) {
      res.status(400).send(` required parameter missing. example request body:
      {
          "query": "Hi",
      }`);
      return;
    }

    await messageModel.create({
      query: body.query,
      from: "user",
    });

    // TODO: send query to dialogflow and get chatbot response
    // https://dialogflow.googleapis.com
// projects/<Project ID>/agent/sessions/<Session ID>
    // let response = await axios.post(
    //   "https://dialogflow.googleapis.com/v2/projects/duetagent-l9ou/agent/sessions/<userID>:detectIntent",
    //   {
    //     queryInput: {
    //       text: {
    //         text: body.query,
    //         languageCode: "en-us",
    //       },
    //     },
    //   }
    // );

    // console.log(response.data, 'axios res....');


    // using dialogflow library...
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(
      "duetagent-l9ou",
      "user123"
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: body.query,
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;

    console.log("responses: ", result.fulfillmentText);

    res.send({
      message: {
        text: result.fulfillmentText,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "server error",
    });
  }
});

// request object...

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

    console.log(intentName, "Intern name here");

    if (intentName === "placeOrder") {
      const newOrder = new orderModel({
        orderName: params.person.name,
        pizzaSize: params.pizzaSize,
        pizzaFlavour: params.pizzaFlavour,
        qty: params.qty,
      });

      const savedOrder = await newOrder.save();
      console.log(`New order added:`, savedOrder);

      let responseText = `you said ${params.qty} ${params.pizzaSize} ${params.pizzaFlavour} pizza,  your pizza is on the way`;

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
    // res.status(500).send({
    //   message: "Internal Server Error",
    // });
    res.send({
      fulfillmentMessages: [
        {
          text: {
            text: ["some went wrong in server! please try again.."],
          },
        },
      ],
    });
  }
});

// //////////////////////////////////////////////
// //////////////////////////////////////////////
// authentication api's
app.use("/api/user/", userRouter);
app.use("/api/feedback", feedbackRouter);


app.use("/test", (req, res) => res.send("test ngrok server"));

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});
