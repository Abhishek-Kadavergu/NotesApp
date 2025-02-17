const express = require("express");
require("dotenv").config();
const port = process.env.PORT;
const connectToMongoDb = require("./db");
const userRoute = require("./routes/user.js");
const noteRouter = require("./routes/note.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send({ message: "running on chrome" });
});

const startServer = async () => {
  await connectToMongoDb();
  app.listen(5000, () => {
    console.log("Server nadustundhi roo...🕺");
  });
};
startServer();
