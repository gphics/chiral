require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passcodeRouter = require("./Routers/passcodeRouter");
const userRouter = require("./Routers/userRouter");
const projectRouter = require("./Routers/projectRouter");
const briefRouter = require("./Routers/briefRouter");
const dbConnect = require("./config/dbConnect");
dbConnect();
// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

// routes
app.use("/passcode", passcodeRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/brief", briefRouter);

// error handling
app.use((err, _, res) => {
  const { message, code } = err;
  res.json({ data: null, err: { message, code } });
});

const port = process.env.PORT_NUMBER;
app.listen(port, () => console.log("SERVER RUNNING ON PORT: ", port));
