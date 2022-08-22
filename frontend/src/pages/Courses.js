import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CourseList from "../components/CourseList/CourseList";
import Footer from "../components/Footer/Footer";

const Courses = () => {
  return (
    <section className="section-footer">
      <div className="top">
        <Navbar />
        <CourseList />
      </div>
      <Footer />
    </section>
  );
};

export default Courses;
