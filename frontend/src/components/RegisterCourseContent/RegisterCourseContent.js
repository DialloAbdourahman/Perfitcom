import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  db,
  setDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  increment,
} from "../../firebase";
import { useGlobalContext } from "../../context";
import "./RegisterCourseContent.css";

const options = [
  { value: "/", label: "/" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

const RegisterCourseContent = ({ course }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [job, setJob] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const { user, fetchCourses } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      age &&
      gender &&
      phoneNumber &&
      job &&
      address
    ) {
      // push notification.
      const addUserAndRegister = async () => {
        try {
          await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            age,
            gender,
            phoneNumber,
            job,
            address,
          });
          const userID = user.uid;
          const courseID = course;
          let today = new Date();
          const date =
            today.getDate() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getFullYear();
          const register = async () => {
            try {
              const docRef = await addDoc(collection(db, "registeredCourses"), {
                courseID,
                date,
                userID,
              });
              // here we decrement the number of available places.
              const CourseRef = doc(db, "courses", course);
              await updateDoc(CourseRef, {
                spacesLeft: increment(-1),
              });
              alert(
                "You have registered successfully to our course. We will contact you for more information."
              );
              navigate("/courses");
              fetchCourses();
            } catch (e) {
              alert("Unable to register this course.");
            }
          };
          register();
        } catch (error) {
          alert("There was an error please try again later.");
        }
      };
      addUserAndRegister();
    } else {
      alert("Please enter all the fields before we can proceed.");
    }
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <section className="RegisterCourseContent">
      <h1>Please enter the following information before we proceed.</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name : </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name : </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age : </label>
          <input
            type="number"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender : </label>
          <select value={gender} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number : </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="job">Job Occupied : </label>
          <input
            type="text"
            name="job"
            id="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address : </label>
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default RegisterCourseContent;
