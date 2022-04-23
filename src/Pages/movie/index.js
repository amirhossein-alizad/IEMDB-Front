import React, { useEffect, useState } from "react";
import './../../css/base.css';
import './../../css/normalize.css'
import './../../css/header.css';
import './../../css/movie.css';
import { useParams } from "react-router-dom";
import { addCommentAPI, addToWatchlistAPI, getMoiveByIdAPI, getMovieActorsAPI, getMovieCommentsAPI, likeCommentAPI, dislikeCommentAPI } from "../../api";
import { toast } from "react-toastify";
import Header from "../../Components/header";

const Moive = () => {
  document.body.style.backgroundColor = '#292929';

  const [moive, setmoive] = useState(null);
  const [comments, setcomments] = useState([]);
  const [actors, setactors] = useState([]);
  const [isLoadingMovie, setisLoadingMovie] = useState(false);
  const [isLoadingActors, setisLoadingActors] = useState(false);
  const [isLoadingComments, setisLoadingComments] = useState(false);
  const [newComment, setnewComment] = useState("");
  const [newCommentLoading, setnewCommentLoading] = useState(false);
  const [addToWatchlistLoading, setaddToWatchlistLoading] = useState(false);
  // const [upvoteLoading, setupvoteLoading] = useState(false);
  // const [downvoteLoading, setdownvoteLoading] = useState(false);
  const { id } = useParams()

  const getMovie = () => {
    setisLoadingMovie(true)
    getMoiveByIdAPI(id)
      .then(response => {
        setmoive(response.data)
        setisLoadingMovie(false)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در برقراری ارتباط با سرور پیش آمده است")
        setisLoadingMovie(false)
      })
  }

  const getActors = () => {
    setisLoadingActors(true)
    getMovieActorsAPI(id)
      .then(response => {
        setactors(response.data)
        setisLoadingActors(false)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در برقراری ارتباط با سرور پیش آمده است")
        setisLoadingActors(false)
      })
  }

  const getComments = () => {
    setisLoadingComments(true)
    getMovieCommentsAPI(id)
      .then(response => {
        setcomments(response.data)
        setisLoadingComments(false)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در برقراری ارتباط با سرور پیش آمده است")
        setisLoadingComments(false)
      })
  }

  const isMovieReady = () => {
    return !isLoadingMovie && moive;
  }

  const isActorsReady = () => {
    return !isLoadingActors;
  }

  const isCommentsReady = () => {
    return !isLoadingComments;
  }

  const getNumberOfVotes = (movie) => {
    if (movie.User == null)
      return 0;
    else
      return moive.User.length
  }

  useEffect(() => {
    getMovie()
    getActors()
    getComments()
  }, [])

  useEffect(() => {
    console.log(moive)
    console.log(actors)
    console.log(comments)
  }, [moive, actors, comments])

  const handleAddToWatchList = (e) => {
    e.preventDefault();
    setaddToWatchlistLoading(true)
    addToWatchlistAPI(id)
      .then(response => {
        toast.info("فیلم با موفقیت به لیست افزوده شد.")
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        if (e.response && e.response.data == "MovieAlreadyExists")
          toast.info("فیلم در حال حاضر در لیست قرار دارد")
        else if (e.response && e.response.data == "AgeLimitError")
          toast.error("این فیلم برای سن شما مناسب نیست!")
        else
          toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
      })
      .finally(() => setaddToWatchlistLoading(false))
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    setnewCommentLoading(true);
    addCommentAPI(id, newComment)
      .then(response => {
        setnewComment("")
        setnewCommentLoading(false)
        toast.info("کامنت شما با موفقیت ثبت شد.")
        getComments()
      })
      .catch((e) => {
        console.log(e)
        console.log(e.response)
        setnewCommentLoading(false)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است")
      })
  }

  const handleLikeComment = (e, comment_id) => {
    e.preventDefault();
    toast.info("در حال ارسال اطلاعات!")
    likeCommentAPI(comment_id)
      .then(response => {
        toast.info("نظر شما با موفقیت ثبت شد!")
        getComments();
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
      })
  }

  const handleDislikeComment = (e, comment_id) => {
    e.preventDefault();
    toast.info("در حال ارسال اطلاعات!")
    dislikeCommentAPI(comment_id)
      .then(response => {
        toast.info("نظر شما با موفقیت ثبت شد!")
        getComments();
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("مشکلی در ارتباط با سرور پیش آمده است!")
      })
  }

  return (
    <>
      <Header showSearch={false} SearchBy={[null, null]} SearchKey={[null, null]}></Header>
      {(isLoadingMovie || moive == null) ? <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "5rem", height: "5rem" }} role="status"></div></div> :
        (<div className="movie-poster" style={{ backgroundImage: `url(${moive.coverImage})` }}>
          <div className="row empty-row"></div>
          <div className="row">
            <div className="col"></div>
            <div className="col movie-picture-height transparent-red color-white">
              <div className="row p-3 movie-imeb-rate justify-content-center">{isMovieReady() ? moive.imdbRate : null}</div>
              <div className="row">
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
                <div className="col p-0 m-0"><svg height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><path fill="#ffce31" d="M62 25.2H39.1L32 3l-7.1 22.2H2l18.5 13.7l-7 22.1L32 47.3L50.5 61l-7.1-22.2L62 25.2z" /></svg></div>
              </div>
              <div className="row p-3">
                <div className="col">
                  <div className="row justify-content-center p-1 users-rating">امتیاز کاربران:</div>
                  <div className="row justify-content-center p-1 number-of-votes">({isMovieReady() ? getNumberOfVotes(moive) : null} رای)</div>
                </div>
                <div className="col">
                  <span className="row justify-content-center movie-rate">{isMovieReady() ? moive.rating : null}</span>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="ltr color-white mb-3">{isMovieReady() ? moive.name : null}</div>
              <div className="color-white mb-3">کارگردان: {isMovieReady() ? moive.director : null}</div>
              <div className="color-white mb-3">نویسنده: {isMovieReady() ? moive.writers.toString() : null}</div>
              <div className="color-white mb-3">مدت زمان: {isMovieReady() ? moive.duration : null} دقیقه</div>
            </div>
            <div className="col movie-picture movie-picture-height" style={{ backgroundImage: (!isLoadingMovie && moive) ? `url(${moive.image})` : 'none' }}></div>
            <div className="col"></div>
          </div>
        </div>)}

      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col-4">
          <div className="ltr color-white m-3"> تاریخ انتشار:   {isMovieReady() ? moive.releaseDate : "...درحال بارگزاری"} </div>
          <div className="line color-white mx-5 my-4"></div>
          <div className="color-white m-3">
            {isMovieReady() ? moive.summary : null}
          </div>
        </div>
        <div className="col">
          {isMovieReady() ? (
            <div className="add-to-watchlist-button">
              <button type="button" className="btn btn-danger" onClick={(e) => handleAddToWatchList(e)}>
                اضافه کردن به لیست
                {addToWatchlistLoading ? <div className="spinner-border" style={{ width: "1rem", height: "1rem" }} role="status"></div> : null}
              </button>
            </div>
          ) : null}
        </div>
        <div className="col"></div>
      </div>

      <div className="container background-color-light-gray actor-container my-5">
        <div className="ltr actor-images-row">
          {isActorsReady() ? (
            actors.map((item, index) => <img alt={item.name} id={index} className="m-4 actor-image" src={item.image} />)
          ) : <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "3rem", height: "3rem" }} role="status"></div></div>
          }


        </div>
      </div>

      <div className="container background-color-light-gray actor-container my-5 px-5 pb-5">
        <div className="px-5 py-3 row color-white comments"> دیدگاه ها </div>
        <div className="px-5 py-3 my-5 mx-5 row add-comment background-color-white">
          <div className="row m-1">دیدگاه خود را اضافه کنید: </div>
          <div className="row mx-3 my-1 gray-line"></div>
          <div className="row m-1 ">
            <textarea rows="2" className="search-bar" onChange={(e) => setnewComment(e.target.value)}>{newComment}</textarea>
          </div>
          <div className="row m-1 ltr">
            <div className="col ltr">
              <button className="btn btn-success px-5 py-1" onClick={(e) => handleAddComment(e)}>
                ثبت
                {newCommentLoading ? <div className="spinner-border" style={{ width: "1rem", height: "1rem" }} role="status"></div> : null}
              </button>
            </div>
          </div>
        </div>


        {isCommentsReady() ?
          comments.map((item, index) => (
            <div className="px-5 py-3 my-5 mx-5 row add-comment background-color-white" key={index}>
              <div className="row m-1 commenter"> {item.userEmail} </div>
              <div className="row mx-3 my-1 gray-line"></div>
              <div className="row m-1 ">
                <div className="row">
                  <div className="col">
                    {item.text}
                  </div>
                  <div className="col-md-auto">
                    <div className="row">
                      <div className="col mx-2">
                        <div className="row upvote-container">
                          <div className="upvote" onClick={(e) => handleLikeComment(e, item.id)}></div>
                        </div>
                        <div className="row justify-content-center mt-1">{item.like}</div>
                      </div>
                      <div className="col  mx-2">
                        <div className="row downvote-container">
                          <div className="downvote" onClick={(e) => handleDislikeComment(e, item.id)}></div>
                        </div>
                        <div className="row justify-content-center mt-1">{item.dislike}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <div className="text-center"><div className="movie-poster spinner-border text-danger m-5" style={{ width: "3rem", height: "3rem" }} role="status"></div></div>
        }

      </div>
    </>
  )
}

export default Moive;