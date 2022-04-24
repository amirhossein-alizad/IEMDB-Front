import './../../css/normalize.css';
import './../../css/base.css';
import './../../css/header.css';
import './../../css/actor.css';
import React from "react";

const Actor = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-9 color-white">
          <div className="row justify-content-center py-4 actor-details"> مشخصات بازیگر </div>
          <div className="row py-4 mx-5">
            <div className="row py-2 actor-properties"> نام: Tom Holland </div>
            <div className="row py-2 actor-properties"> تاریخ تولید: 1996/1/1 </div>
            <div className="row py-2 actor-properties"> ملیت: UK </div>
            <div className="row py-2 actor-properties"> تعداد فیلم‌ها: 4 </div>
          </div>
          <div className="row justify-content-center actor-movies-text"> فیلم‌ها </div>
          <div className="row actor-movies background-color-light-gray mx-5 my-3 px-3 py-1">
            <div className="ltr actor-movies-row">
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
              <img alt="actor-movie" className="m-5 actor-movie-image" src="assets/images/tom.jpeg" />
            </div>
          </div>
        </div>
        <div className="col-3 actor-image"></div>
      </div>
    </div>
  )
}

export default Actor;