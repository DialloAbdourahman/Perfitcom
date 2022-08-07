import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import { db, doc, deleteDoc } from "../../firebase";
import SmallForm from "../SmallForm/SmallForm";
import "./DashboardCourses.css";

const DashboardCourses = () => {
  const { courses, fetchCourses } = useGlobalContext();
  const [isSmallFormOpen, setIsSmallFormOpen] = useState(false);
  const [ID, setID] = useState(null);

  const editCourse = (id) => {};
  const deleteCourse = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    alert("You have successfully deleted this course.");
    fetchCourses();
  };

  return (
    <section className="DashboardCourses">
      <button className="createbtn" onClick={() => setIsSmallFormOpen(true)}>
        Add a course
      </button>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Requirements</th>
            <th>Type</th>
            <th>Spaces Left</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            const {
              id,
              code,
              description,
              name,
              price,
              spacesLeft,
              type,
              requirements,
            } = course;
            return (
              <tr key={id}>
                <td>{code}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{requirements}</td>
                <td>{type}</td>
                <td>{spacesLeft}</td>
                <td>{description}</td>
                <td>
                  <button
                    className="editbtn"
                    onClick={() => {
                      setID(id);
                      setIsSmallFormOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="deletebtn"
                    onClick={() => deleteCourse(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isSmallFormOpen && (
        <SmallForm
          setIsSmallFormOpen={setIsSmallFormOpen}
          ID={ID}
          setID={setID}
        />
      )}
    </section>
  );
};

export default DashboardCourses;
