import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";
import { useGlobalContext } from "./context";

// Pages import
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import SingleCourse from "./pages/SingleCourse";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RegisterCourse from "./pages/RegisterCourse";
import Contact from "./pages/Contact";

const App = () => {
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    });
  }, []);

  return (
    <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/registerCourse/:courseid" element={<RegisterCourse />} />
        <Route path="/course/:courseid" element={<SingleCourse />} />
      </Routes>
    </section>
  );
};

export default App;
