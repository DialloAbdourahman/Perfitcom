import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import RegisterCourseContent from "../components/RegisterCourseContent/RegisterCourseContent";

const RegisterCourse = () => {
  const params = useParams();

  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <RegisterCourseContent course={params.courseid} />
      </div>
      <Footer />
    </section>
  );
};

export default RegisterCourse;
