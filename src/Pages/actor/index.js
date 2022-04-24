import './../../css/normalize.css';
import './../../css/base.css';
import './../../css/header.css';
import './../../css/actor.css';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getActorAPI, getActorMoviesAPI } from '../../api';
import { toast } from 'react-toastify';
import Header from '../../Components/header';

const Actor = () => {
  document.body.style.backgroundColor = '#292929';

  let navigator = useNavigate()
  const [isActorLoading, setisActorLoading] = useState(false);
  const [isMoviesLoading, setisMoviesLoading] = useState(false);
  const [moives, setmoives] = useState([]);
  const [actor, setactor] = useState(null);

  let { id } = useParams()

  const getActor = () => {
    setisActorLoading(true)
    getActorAPI(id)
      .then(response => {
        setactor(response.data)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در در دریافت اطلاعات از سرور پیش آمده است!")
      })
      .finally(() => {
        setisActorLoading(false)
      })
  }

  const getActorMovies = () => {
    setisMoviesLoading(true)
    getActorMoviesAPI(id)
      .then(response => {
        setmoives(response.data)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در در دریافت اطلاعات از سرور پیش آمده است!")
      })
      .finally(() => {
        setisMoviesLoading(false)
      })
  }

  useEffect(() => {
    console.log(actor, moives)
  }, [actor, moives])

  useEffect(() => {
    getActor()
    getActorMovies()
  }, [])

  return (
    <>
      <Header showSearch={false} SearchBy={[null, null]} SearchKey={[null, null]}></Header>

      <div className="container-fluid">
        <div className="row">
          <div className="col-9 color-white">
            <div className="row justify-content-center py-4 actor-details"> مشخصات بازیگر </div>
            {actor != null && moives != null ? (
              <div className="row py-4 mx-5">
                <div className="row py-2 actor-properties"> نام: {actor.name} </div>
                <div className="row py-2 actor-properties"> تاریخ تولید: {actor.birthDate} </div>
                <div className="row py-2 actor-properties"> ملیت: {actor.nationality} </div>
                <div className="row py-2 actor-properties"> تعداد فیلم‌ها: {moives.length} </div>
              </div>) : <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "4rem", height: "4rem" }} role="status"></div></div>
            }
            <div className="row justify-content-center actor-movies-text"> فیلم‌ها </div>
            <div className="row actor-movies background-color-light-gray mx-5 my-3 px-3 py-1">
              <div className="ltr actor-movies-row">
                {isMoviesLoading ?
                  (<div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "3rem", height: "3rem" }} role="status"></div></div>)
                  : (moives.map((item, index) => {
                    return <img alt="actor-movie" className="m-5 actor-movie-image" src={item.image} onClick={(e) => navigator(`/movies/${item.id}`)} />
                  }
                  )
                  )}
              </div>
            </div>
          </div>
          <div className="col-3 actor-image-poster" style={{ backgroundImage: (actor ? `url(${actor.image})` : 'none') }}></div>
        </div>
      </div>
    </>
  )
}

export default Actor;