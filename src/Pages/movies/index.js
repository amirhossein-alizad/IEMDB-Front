import './../../css/normalize.css';
import './../../css/header.css';
import './../../css/base.css';
import './../../css/movies.css';
import React, { useEffect, useState } from "react";
import Header from '../../Components/header';
import { filterMoviesAPI, getMoviesAPI } from '../../api';
import { toast } from 'react-toastify';

const Movies = () => {
  document.body.style.backgroundColor = '#292929';
  const [movies, setmovies] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [searchBy, setsearchBy] = useState("");
  const [sortBy, setsortBy] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true)
    getMoviesAPI()
      .then(response => {
        setmovies(response.data)
        setisLoading(false)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
        setisLoading(false)
      })
  }, [])

  useEffect(() => {
    setisLoading(true)
    filterMoviesAPI(searchKey, searchBy, sortBy)
      .then(response => {
        setmovies(response.data)
        setisLoading(false)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
        setisLoading(false)
      })
  }, [searchBy, sortBy])

  return (
    <>
      <Header showSearch={true} SearchBy={[searchBy, setsearchBy]} SearchKey={[searchKey, setsearchKey]}></Header>

      <div className="container-fluid mt-5 pt-5 background-color-dark-gray">
        <div className="row">
          <div className="col-2 pt-5 flex-vertical-center">
            <div><span className="color-white sorting-label">رتبه بندی بر اساس:</span></div>
            <div className="mt-3 background-color-red flex-vertical-center sorting-box">
              <div className="pt-4 px-3 pb-4"><a className="color-white" onClick={(e) => setsortBy('date')}>تاریخ</a></div>
              <div className="pb-4 px-5 pt-4"><a className="color-white" onClick={(e) => setsortBy('rate')}> امتیاز IMDB</a></div>
            </div>
          </div>
          <div className="col-8 flex-center">
            {isLoading ? <div class="spinner-border text-danger" role="status"></div> :
              (
                movies.length > 0 ? movies.map((item, index) => (
                  <div className="m-4" key={index}>
                    <img alt="movie-image" className="movie-img" src={item.coverImage} />
                  </div>
                )) : <div className='color-white'>فیلمی مطابق با این اطلاعات وجود ندارد</div>
              )
            }
          </div>
          <div className="col-2">
            <div className="m-3">

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movies;