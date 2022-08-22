import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import Course from "../Course/Course";
import "./CourseList.css";

const CourseList = () => {
  const { courses } = useGlobalContext();
  const [searchedCourses, setSearchedCourses] = useState([]);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchItems = courses.filter((course) => {
      return course.name.toLowerCase().includes(text.toLowerCase());
    });

    setSearchedCourses(searchItems);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setSearchedCourses(courses);
  }, [courses]);

  useEffect(() => {
    if (!text) {
      setSearchedCourses(courses);
    }
  }, [text]);

  return (
    <section className="CourseList">
      <div className="head">
        <h1>Courses</h1>
      </div>
      <form onChange={handleSubmit} onSubmit={handleSubmit2}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search a course"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div className="list">
        {searchedCourses.map((course) => {
          return <Course key={course.id} {...course} />;
        })}
      </div>
    </section>
  );
};

export default CourseList;
