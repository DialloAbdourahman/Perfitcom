import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import {
  db,
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  increment,
  query,
  where,
  getDocs,
} from "../../firebase";
import "./Course.css";

const Course = ({ id, name, code, price, description, spacesLeft }) => {
  const navigate = useNavigate();

  const { user, fetchCourses } = useGlobalContext();

  const registerCourse = async () => {
    if (!user) {
      alert("Please create an account or login");
    } else if (user?.photoURL === "true") {
      alert("Sorry, an admin cannot register to a course.");
    } else {
      const q = query(
        collection(db, "registeredCourses"),
        where("courseID", "==", `${id}`),
        where("userID", "==", `${user.uid}`)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        alert("Imposible to register to a course twice.");
      } else {
        const checkIfUserExistAlready = async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userID = user.uid;
            const courseID = id;
            let today = new Date();
            const date =
              today.getDate() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getFullYear();
            const register = async () => {
              try {
                const docRef = await addDoc(
                  collection(db, "registeredCourses"),
                  {
                    courseID,
                    date,
                    userID,
                    approved: false,
                  }
                );
                const CourseRef = doc(db, "courses", id);
                await updateDoc(CourseRef, {
                  spacesLeft: increment(-1),
                });
                alert(
                  "We have received your request, now we are processing it.We will send you feedback through an email"
                );
                fetchCourses();
              } catch (e) {
                alert("Unable to register this course.");
              }
            };
            register();
          } else {
            navigate(`/registerCourse/${id}`);
          }
        };
        checkIfUserExistAlready();
      }
    }
  };
  return (
    <article className="Course">
      <p>Title : {name}</p>
      <p>Code : {code}</p>
      <p>Price : {price} FCFA</p>
      <p>
        Spaces left :{" "}
        <span className={`${spacesLeft <= 5 && "red"}`}>{spacesLeft}</span>
      </p>
      <p>Description : {`${description.substring(0, 100)}...`}</p>
      <div className="btn-list">
        <button onClick={registerCourse}>Reserve Place </button>
        <button onClick={() => navigate(`/course/${id}`)}>View More</button>
      </div>
    </article>
  );
};

export default Course;

// custom push notification (video).
// dashboard.
// continuous deployment with netlify and github (video).
