import './../../css/normalize.css';
import './../../css/base.css';
import './../../css/header.css';
import './../../css/watchlist.css';
import React, { useState, useEffect } from "react";
import Header from "../../Components/header";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getRecommendationsAPI, getWatchlistAPI, removeFromWatchlistAPI } from '../../api';

const Watchlist = () => {
  document.body.style.backgroundColor = '#292929';

  const navigator = useNavigate()
  const [isMoviesLoading, setisMoviesLoading] = useState(false);
  const [isRecomsLoading, setisRecomsLoading] = useState(false);
  const [moives, setmoives] = useState([]);
  const [recoms, setrecoms] = useState([]);
  // const [movieToBeRemoved, setmovieToBeRemoved] = useState(-1);
  const [removingMovieLoading, setremovingMovieLoading] = useState(false);

  const getWatchlist = () => {
    setisMoviesLoading(true)
    getWatchlistAPI()
      .then(response => {
        setmoives(response.data)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
      })
      .finally(() => {
        setisMoviesLoading(false)
      })
  }

  const getRecoms = () => {
    setisRecomsLoading(true)
    getRecommendationsAPI()
      .then(response => {
        setrecoms(response.data)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
      })
      .finally(() => {
        setisRecomsLoading(false)
      })
  }

  useEffect(() => {
    getWatchlist()
    getRecoms()
  }, [])

  useEffect(() => {
    console.log(moives, recoms)
  }, [moives, recoms])

  const hadleRemoveFromWatchlist = (e, moive_id) => {
    e.preventDefault();
    setremovingMovieLoading(true)
    removeFromWatchlistAPI(moive_id)
      .then(repsonse => {
        toast.info("فیلم با موفقیت از لیست حذف شد!")
        getWatchlist()
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در برقراری ارتباز با سرور پیش آمده است!")
      })
      .finally(() => {
        setremovingMovieLoading(false)
      })

  }

  return (
    <>
      <Header showSearch={false} SearchBy={[null, null]} SearchKey={[null, null]}></Header>

      <div className="container mt-5 pt-5">
        {isMoviesLoading ? <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "3rem", height: "3rem" }} role="status"></div></div> : (
          (moives.length == 0 ? <div className='color-white text-center'>فیلمی در لیست وجود ندارد</div> : moives.map((item, index) => {
            return (
              <>
                <div className="row background-color-light-gray color-white movie-box m-5">
                  <div className="col-9">
                    <div className="row m-3">
                      <div className="col">
                        {removingMovieLoading ? <div className="movie-poster spinner-border text-danger" style={{ width: "1.5rem", height: "1.5rem" }} role="status"></div> : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-trash delete-icon" viewBox="0 0 16 16" onClick={(e) => hadleRemoveFromWatchlist(e, item.id)}>
                            <path
                              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                        )}
                      </div>
                      <div className="ltr col movie-title"> {item.title} </div>
                    </div>
                    <div className="row m-3">
                      <div className="col"> <b>کارگردان: </b> {item.director} </div>
                    </div>
                    <div className="row m-3">
                      <div className="col"> <b>ژانر: </b> {item.genres.toString()} </div>
                      <div className="col"> <b> امتیاز IMDB: </b> {item.imdbRating} </div>
                    </div>
                    <div className="row m-3">
                      <div className="col"> <b>تاریخ انتشار: </b> {item.releaseDate} </div>
                      <div className="col"> <b> امتیاز کاربران: </b> {item.rating}</div>
                    </div>
                    <div className="row m-3">
                      <div className="col"> <b>مدت زمان: </b> {item.duration} دقیقه </div>
                    </div>

                  </div>
                  <div className="col-3 movie-poster-div" style={{ backgroundImage: `url(${item.image})` }}></div>
                </div>
              </>
            )
          }))
        )}

      </div>

      <div className="container background-color-light-gray recommendations-container">
        <div className="row color-white justify-content-center movie-title pt-3"> فیلم‌های پیشنهادی </div>
        <div className="row m-3 justify-content-center">
          {isRecomsLoading ? <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "3rem", height: "3rem" }} role="status"></div></div> : (
            recoms.map((item, index) => {
              return (
                <div className="ltr col movies-row pb-3">
                  <img alt="movie" className="mx-5 my-3 movie-image" src={item.image} onClick={(e) => navigator(`/movies/${item.id}`)} />
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}


export default Watchlist;
