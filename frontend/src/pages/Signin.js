import React from "react";
import SigninForm from "../components/SigninForm/SigninForm";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Signin = () => {
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <SigninForm />
      </div>
      <Footer />
    </section>
  );
};

export default Signin;
