import React from "react";
import SignupForm from "../components/SignupForm/SignupForm";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Signup = () => {
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <SignupForm />
      </div>
      <Footer />
    </section>
  );
};

export default Signup;
