import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { connectDb } from "./config/connectdb.js";
import userRouter from "./routes/userRoutes.js";
import orderModel from "./models/OrderPlace.js";
import messageModel from "./models/Message.js";
import feedbackRouter from "./routes/feedback.js";

import momentTZ from "moment-timezone";
import moment from "moment";
import axios from "axios";
import dialogflow from "dialogflow";
import { dialogflowsKeysVariantResponses } from "./models/Datafeed.js";

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
    // "duetagent-l9ou",
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(
      "aichatbot-ascy",
      body.userId
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
    const result = responses[0].queryResult;

    console.log(body.userId, "responses: ", result.fulfillmentText);

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

function getDialogflowUserQueryResponse(userInput) {
  let maxMatchPriority = -1;
  let bestMatch = null;

  dialogflowsKeysVariantResponses.forEach((item) => {
    const matchCount = item.keywords.reduce((count, keyword) => {
      if (userInput.toLowerCase().includes(keyword.toLowerCase())) {
        return count + 1;
      }
      return count;
    }, 0);

    if (matchCount > maxMatchPriority) {
      maxMatchPriority = matchCount;
      bestMatch = item;
    }
  });

  return bestMatch
    ? bestMatch.answer
    : "I'm sorry, I don't understand that question. Please ask another one.";
}

app.post("/messages", async (req, res) => {
  try {
    const query = req.body.query;
    if (!query) {
      res.status(400).send(` required parameter missing. example request body:
      {
          "query": "Hi",
      }`);
      return;
    }

    
    const getResult = await getDialogflowUserQueryResponse(query);
    console.log('hit api run here', query, getResult);

    res.send({
      message: {
        text: getResult,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "server error",
    });
  }
});

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
