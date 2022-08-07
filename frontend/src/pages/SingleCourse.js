import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SingleCourseContent from "../components/SingleCourseContent/SingleCourseContent";

const Course = () => {
  const params = useParams();
  const courseID = params.courseid;

  return (
    <>
      <Navbar />
      <SingleCourseContent id={courseID} />
      <Footer />
    </>
  );
};

export default Course;
