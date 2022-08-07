import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase";
import { useGlobalContext } from "../../context";

const SignupForm = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [age, setAge ] = useState('')
  // const [sex, setSex] = useState("");
  // const [job, setJob] = useState("");
  // const [number, setNumber] = useState("");
  // const [town, setTown] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          setName("");
          setEmail("");
          setPassword("");

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: `${isAdmin}`,
          })
            .then(() => {
              console.log(user);
              dispatch({ type: "SET_USER", payload: user });
              navigate("/");
              window.location.reload();
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("Please enter the name, email and password");
    }
  };

  return (
    <section className="SigninForm">
      <h1>Sign up please</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">UserName : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit">Sign up</button>
        <div className="traverse">
          <Link to={"/signin"} className="traverse">
            Already have an account? sign in instead.
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
