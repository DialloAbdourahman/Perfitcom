import React, { useState, useEffect } from "react";
import axios from "axios";
import { db, doc, deleteDoc, updateDoc } from "../../firebase.js";
import { useGlobalContext } from "../../context";
import "./DashboardRegisteredCourses.css";

const DashboardRegisteredCourses = () => {
  const { registeredCourses, users, courses, fetchRegisteredCourses } =
    useGlobalContext();

  const sendEmailForRegistration = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/approve", {
        useremail: users.find((user) => user.id === id)?.email,
      });
      alert("This user has been approved.");
    } catch (error) {
      console.error(error);
      alert("not great");
    }
  };

  const sendEmailForRejection = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/reject", {
        useremail: users.find((user) => user.id === id)?.email,
      });
      alert("You have deleted this registration.");
      fetchRegisteredCourses();
    } catch (error) {
      console.error(error);
      alert("not great");
    }
  };

  const deleteRegistration = async (id, uid) => {
    await deleteDoc(doc(db, "registeredCourses", id));
    sendEmailForRejection(uid);
    fetchRegisteredCourses();
  };

  const approveRegistration = async (id, uid) => {
    const CourseRef = doc(db, "registeredCourses", id);
    await updateDoc(CourseRef, {
      approved: true,
    });
    sendEmailForRegistration(uid);
    fetchRegisteredCourses();
  };

  return (
    <section className="DashboardRegisteredCourses">
      <h1>Registration:{registeredCourses.length}</h1>
      <table>
        <thead>
          <th>Username</th>
          <th>Course</th>
          <th>Date</th>
          <th>Approved</th>
          <th>Operations</th>
        </thead>
        <tbody>
          {registeredCourses.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {users.find((user) => user.id === item.userID)?.firstName}{" "}
                  {users.find((user) => user.id === item.userID)?.lastName}
                </td>
                <td>
                  {courses.find((course) => course.id === item.courseID)?.name}
                </td>
                <td>{item?.date}</td>
                <td>{item?.approved ? "Approved" : "Not Approved"}</td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => approveRegistration(item.id, item.userID)}
                  >
                    Approved
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => deleteRegistration(item.id, item.userID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default DashboardRegisteredCourses;
