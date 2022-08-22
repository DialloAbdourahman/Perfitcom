import React from "react";
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import DashboardContent from "../components/DashboardContent/DashboardContent";

const Dashboard = () => {
  const { user } = useGlobalContext();

  if (user?.photoURL === "false") {
    return <h1>Please stop it because you are not an admin thief !!!</h1>;
  }
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <DashboardContent />
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
