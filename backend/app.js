const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/contact_mail", cors(), async (req, res) => {
  let { text, useremail } = req.body;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ngamessidebora89@gmail.com",
      pass: "JesusFirst1",
    },
  });

  await transport.sendMail({
    from: "ngamessidebora89@gmail.com",
    to: "dialliabdourahman78@gmail.com",
    subject: "test email",
    text,
  });
});

app.listen(
  (process.env.PORT || 4000,
  () => {
    console.log("Server is listening on port 4000");
  })
);
