import React, { useState, useEffect } from "react";
import { db, collection, addDoc, updateDoc, doc } from "../../firebase";
import { useGlobalContext } from "../../context";
import "./SmallForm.css";

const SmallForm = ({ setIsSmallFormOpen, ID, setID }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [requirements, setRequirements] = useState("");
  const [spaces, setSpaces] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const { fetchCourses, courses } = useGlobalContext();

  useEffect(() => {
    if (ID) {
      const found = courses.find((course) => course.id === ID);

      setCode(found.code);
      setName(found.name);
      setPrice(found.price);
      setRequirements(found.requirements);
      setSpaces(found.spacesLeft);
      setDescription(found.description);
      setType(found.type);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ID) {
      if (
        code &&
        name &&
        price &&
        requirements &&
        spaces &&
        description &&
        type
      ) {
        try {
          const docRef = await addDoc(collection(db, "courses"), {
            code,
            name,
            price: parseInt(price, 10),
            requirements,
            spacesLeft: parseInt(spaces, 10),
            description,
            type,
          });
          alert("The course has been added successfully.");
          setCode("");
          setName("");
          setPrice(0);
          setRequirements("");
          setSpaces(0);
          setDescription("");
          setType("");
          setIsSmallFormOpen(false);
          fetchCourses();
        } catch (e) {
          alert("There was a mistake while adding the course.");
        }
      } else {
        alert("Please enter all the fields");
      }
    } else {
      if (
        code &&
        name &&
        price &&
        requirements &&
        spaces &&
        description &&
        type
      ) {
        const updatingCourse = doc(db, "courses", ID);

        await updateDoc(updatingCourse, {
          code,
          name,
          price: parseInt(price, 10),
          requirements,
          spacesLeft: parseInt(spaces, 10),
          description,
          type,
        });
        alert("The course has been updated successfully.");
        setCode("");
        setName("");
        setPrice(0);
        setRequirements("");
        setSpaces(0);
        setDescription("");
        setType("");
        setIsSmallFormOpen(false);
        fetchCourses();
        setID(null);
      } else {
        alert("Please enter all the fields");
      }
    }
  };

  return (
    <section className="SmallForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">code:</label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="requirements">requirements:</label>
          <input
            type="text"
            name="requirements"
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">type:</label>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="spaces">spaces:</label>
          <input
            type="number"
            name="spaces"
            id="spaces"
            value={spaces}
            onChange={(e) => setSpaces(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">description:</label>
          <input
            type="text"
            name="type"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button className="upbtn" type="submit">{ID ? "Update" : "Create"}</button>

          <button className="closebtn" type="button" onClick={() => setIsSmallFormOpen(false)}>
            close
          </button>
        </div>
      </form>
    </section>
  );
};

export default SmallForm;
