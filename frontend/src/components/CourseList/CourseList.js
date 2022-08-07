import React from "react";
import { useGlobalContext } from "../../context";
import Course from "../Course/Course";
import "./CourseList.css";

const CourseList = () => {
  const { courses } = useGlobalContext();

  return (
    <section className="CourseList">
      <div className="head">
        <h1>Courses</h1>
      </div>
      <div className="list">
        {courses.map((course) => {
          return <Course key={course.id} {...course} />;
        })}
      </div>
    </section>
  );
};

export default CourseList;
