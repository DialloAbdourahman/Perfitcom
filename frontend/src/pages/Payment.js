import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PaymentContent from "../components/PaymentContent/PaymentContent";
import Footer from "../components/Footer/Footer";

const Payment = () => {
  const params = useParams();
  const price = params.price;
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <PaymentContent price={price} />
      </div>
      <Footer />
    </section>
  );
};

export default Payment;
