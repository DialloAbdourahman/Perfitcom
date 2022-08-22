import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SingleCourseContent from "../components/SingleCourseContent/SingleCourseContent";

const Course = () => {
  const params = useParams();
  const courseID = params.courseid;

  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <SingleCourseContent id={courseID} />
      </div>
      <Footer />
    </section>
  );
};

export default Course;
