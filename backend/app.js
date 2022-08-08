const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const transport = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MY_MAIL,
    pass: process.env.MY_PASSWORD,
  },
});

app.post("/approve", cors(), (req, res) => {
  let { useremail } = req.body;

  transport.sendMail(
    {
      from: process.env.MY_MAIL,
      to: useremail,
      subject: "Approved",
      text: "Great you can come to perfitcom for us to train you.",
    },
    (err, info) => {
      if (err) {
        console.log(err);
        res.status(400).send("bad job");
      } else {
        console.log(info.response);
        res.status(200).send("good job");
      }
    }
  );
});

app.post("/reject", cors(), (req, res) => {
  let { useremail } = req.body;

  transport.sendMail(
    {
      from: process.env.MY_MAIL,
      to: useremail,
      subject: "Regestion",
      text: "Sorry you have been refused.",
    },
    (err, info) => {
      if (err) {
        console.log(err);
        res.status(400).send("bad job");
      } else {
        console.log(info.response);
        res.status(200).send("good job");
      }
    }
  );
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
