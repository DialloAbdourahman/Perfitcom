import React, { useState } from "react";

// Components import
import DashboardUsers from "../DashboardUsers/DashboardUsers";
import DashboardCourses from "../DashboardCourses/DashboardCourses";
import DashboardRegisteredCourses from "../DashboardRegisteredCourses/DashboardRegisteredCourses";
import "./DashboardContent.css";

const DashboardContent = () => {
  const [content, setContent] = useState("users");

  return (
    <section className="DashboardContent">
      <div className="DashboardContentContainer">
        <div className="left">
          <button onClick={() => setContent("users")}>users</button>
          <button onClick={() => setContent("courses")}>courses</button>
          <button onClick={() => setContent("registeredCourses")}>
            registered courses
          </button>
        </div>
        <div className="right">
          {content === "users" && <DashboardUsers />}
          {content === "courses" && <DashboardCourses />}
          {content === "registeredCourses" && <DashboardRegisteredCourses />}
        </div>
      </div>
    </section>
  );
};

export default DashboardContent;
