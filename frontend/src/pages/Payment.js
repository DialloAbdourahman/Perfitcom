import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PaymentContent from "../components/PaymentContent/PaymentContent";
import Footer from "../components/Footer/Footer";

const Payment = () => {
  const params = useParams();
  const price = params.price;
  return (
    <>
      <Navbar />
      <PaymentContent price={price} />
      <Footer />
    </>
  );
};

export default Payment;
