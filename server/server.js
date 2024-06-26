require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passcodeRouter = require("./Routers/passcodeRouter");
const userRouter = require("./Routers/userRouter");
const projectRouter = require("./Routers/projectRouter");
const briefRouter = require("./Routers/briefRouter");
const dbConnect = require("./config/dbConnect");
const pdfRouter = require("./Routers/pdfRouter");

dbConnect();
// middlewares

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use("/passcode", passcodeRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/brief", briefRouter);
app.use("/pdf", pdfRouter);



// error handling
app.use((err, req, res, next) => {
  const { message, code } = err;
  res.status(code).json({ data: null, err: { message, code } });
});
const port = process.env.PORT_NUMBER;
app.listen(port, () => console.log("SERVER RUNNING ON PORT: ", port));
