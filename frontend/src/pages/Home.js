import React from "react";
import Navbar from "../components/Navbar/Navbar";
import HomeContent from "../components/HomeContent/HomeContent";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <HomeContent />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
