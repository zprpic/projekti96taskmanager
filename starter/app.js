const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

// middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
