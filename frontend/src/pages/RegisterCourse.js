import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import RegisterCourseContent from "../components/RegisterCourseContent/RegisterCourseContent";

const RegisterCourse = () => {
  const params = useParams();

  return (
    <>
      <Navbar />
      <RegisterCourseContent course={params.courseid} />
      <Footer />
    </>
  );
};

export default RegisterCourse;
