import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "../../firebase.js";
import { useGlobalContext } from "../../context";
import "./DashboardRegisteredCourses.css";

const DashboardRegisteredCourses = () => {
  const { registeredCourses, users, courses } = useGlobalContext();
  const [registered, setRegistered] = useState([]);

  const fetchregisteredCourses = async () => {
    const q = query(collection(db, "registeredCourses"));

    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setRegistered(data);
  };

  const deleteRegistration = async (id) => {
    await deleteDoc(doc(db, "registeredCourses", id));
    alert("You have deleted this registration.");
    fetchregisteredCourses();
    // Send email to user telling him that he is not approved
  };

  const approveRegistration = async (id) => {
    const CourseRef = doc(db, "registeredCourses", id);
    await updateDoc(CourseRef, {
      approved: true,
    });
    alert("This user has been approved.");
    fetchregisteredCourses();
    // Send email to user telling him that he is approved
  };

  useEffect(() => {
    fetchregisteredCourses();
  }, []);

  return (
    <section className="DashboardRegisteredCourses">
      <h1>Registration:{registered.length}</h1>
      <table>
        <thead>
          <th>Username</th>
          <th>Course</th>
          <th>Date</th>
          <th>Approved</th>
          <th>Operations</th>
        </thead>
        <tbody>
          {registered.map((item) => {
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
                    onClick={() => approveRegistration(item.id)}
                  >
                    Approved
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => deleteRegistration(item.id)}
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
