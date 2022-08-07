import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useGlobalContext } from "../../context";
import "./SingleCourseContent.css";

const SingleCourseContent = ({ id }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useGlobalContext();

  const registerCourse = async () => {
    if (!user) {
      alert("Please create an account or login");
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
                window.location.reload();
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

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (docSnap.exists()) {
        console.log(data);
        setData(docSnap.data());
      } else {
        alert("There was an error");
      }
    };
    getData();
  }, []);

  if (loading) {
    return <h1>Wait a few seconds</h1>;
  }

  return (
    <section className="SingleCourseContent">
      <h1>More information about the course</h1>
      <p>Name : {data?.name}</p>
      <p>Code : {data?.code}</p>
      <p>Type : {data?.type}</p>
      <p>Requirements : {data?.requirements}</p>
      <p>Description : {data?.description}</p>
      <p>Spaces Left : {data?.spacesLeft}</p>
      <div className="btn-list">
        <button onClick={registerCourse}>Register Now</button>
      </div>
    </section>
  );
};

export default SingleCourseContent;
