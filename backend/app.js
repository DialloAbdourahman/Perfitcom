const express = require('express');
const app = express();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

app.post('/approve', cors(), (req, res) => {
  let { useremail } = req.body;

  sgMail
    .send({
      to: useremail,
      from: 'ngamessidebora89@gmail.com',
      subject: 'Approved',
      text: 'Great you can come to perfitcom for us to train you.',
    })
    .then(() => {
      console.log('Email sent');
      res.status(200).send('good job');
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('bad job');
    });
});

app.post('/reject', cors(), (req, res) => {
  let { useremail } = req.body;

  sgMail
    .send({
      to: useremail,
      from: 'ngamessidebora89@gmail.com',
      subject: 'Regection',
      text: 'Sorry you have been refused.',
    })
    .then(() => {
      console.log('Email sent');
      res.status(200).send('good job');
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('bad job');
    });
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is listening on port 4000');
});
