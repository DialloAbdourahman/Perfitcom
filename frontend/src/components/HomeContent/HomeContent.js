import React from "react";
import { partner } from "../../data";
import { upToDateList } from "../../data";
import { useGlobalContext } from "../../context";
import Course from "../Course/Course";
import "./HomeContent.css";

const HomeContent = () => {
  const { courses } = useGlobalContext();
  console.log(courses);
  return (
    <section>
      <img
        src="https://cdn.educba.com/academy/wp-content/uploads/2017/06/certification-training-program.jpg"
        alt=""
        className="banner"
      />
      <div className="Courses">
        <h1>Courses we offer at perfitcom</h1>
      </div>
      <div className="Cour">
        {courses.map((item) => {
          return <Course key={item.id} {...item} />;
        })}
      </div>
      <section className="uptodate ">
        <div className="Courses">
          <h1>Stay up to date - Upcoming live</h1>
        </div>
        <div className="events">
          {upToDateList.map((item) => (
            <article className="stayupdate" key={item.id}>
              <p>Date : {item.date}</p>
              <p>Course : {item.title}</p>
              <p>Time : {item.time}</p>
              <p>Type : {item.type}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="Partners uptodate">
        <div className="left">
          <h3>Our partners</h3>
          <div className="con">
            {partner.map((item) => (
              <article className="SinglePartner" key={item.id}>
                <img
                  src={item.icon}
                  alt="this is an icon please update your browser"
                />
                <p>{item.name}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="right">
          <h3>Why choose us </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, ad
            necessitatibus harum praesentium veritatis voluptatum quos magni
            quidem inventore quibusdam! Saepe tempore nam dolore voluptates
            officiis amet quasi aspernatur minus sunt ad, mollitia ratione
            officia blanditiis accusantium. Dicta nobis aspernatur dolore
            numquam, voluptate, nesciunt ullam quasi ducimus nemo laudantium cum
            placeat
          </p>
        </div>
      </section>
    </section>
  );
};

export default HomeContent;
