import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRouter from "./routes/postRoute.js";
import getRouter from "./routes/getRoute.js";
import deleteRouter from "./routes/deleteRoute.js";

// load environment variables
dotenv.config();

// create an instance of the express application
const app = express();
// setup CORS middleware
app.use(cors());
// configure express to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// general route
app.get("/", async (req, res) => {
  res.send("Hello from budget app server");
});

// API routes
app.use("/budget/post", postRouter);
app.use("/budget/get", getRouter);
app.use("/budget/delete", deleteRouter);

// function to listen to the port
const startServer = async () => {
  // connect to mongoDB
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(3000, () =>
      console.log("Server is running on port http://localhost:3000")
    );
  } catch (error) {
    console.log(error);
  }
};
// call the function
startServer();
