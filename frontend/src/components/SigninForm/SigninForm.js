import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { useGlobalContext } from "../../context";
import "./SigninForm.css";

const SigninForm = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({ type: "SET_USER", payload: user });
          setEmail("");
          setPassword("");
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("Please enter the email and the password");
    }
  };

  return (
    <section className="SigninForm">
      <h1>Sign in please</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail : </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign in</button>
        <div className="traverse">
          <Link to={"/signup"} className="traverse">
            You don't have an account yet? create a new one.
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SigninForm;
