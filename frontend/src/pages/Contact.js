import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ContactContent from "../components/ContactContent/ContactContent";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <ContactContent />
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
