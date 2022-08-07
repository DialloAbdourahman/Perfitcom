import React, { useState } from "react";
import axios from "axios";

const ContactContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    if (name && email && message) {
      try {
        axios.post("http://localhost:4000/contact_mail", {
          useremail: email,
          text: message,
        });
        alert("Message was sent");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter all the fields before submiting");
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <label>Name</label>
      <input
        type="text"
        name="user_name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Message</label>
      <textarea
        name="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactContent;
