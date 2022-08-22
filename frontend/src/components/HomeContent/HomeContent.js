import React from "react";
import { partner } from "../../data";
import { useGlobalContext } from "../../context";
import "./HomeContent.css";

const HomeContent = () => {
  const { courses } = useGlobalContext();
  console.log(courses);
  return (
    <section>
      <img
        src="https://img.freepik.com/vecteurs-libre/banniere-publicitaire-technologie-vecteur-modele-education-e-learning_53876-125996.jpg?w=2000"
        alt=""
        className="banner"
      />
      <div>
        {partner.map((item) => {
          return (
            <article key={item.id}>
              <img src={item.icon} alt="" />
              <p>{item.name}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default HomeContent;
