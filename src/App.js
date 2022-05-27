import './css/base.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/login';
import Signup from './Pages/signup';
import { toast } from 'react-toastify';
import NotFound from './Pages/notFound';
import Movies from './Pages/movies';
import Moive from './Pages/movie';
import Actor from './Pages/actor';
import Watchlist from './Pages/watchlist';
import Callback from './Pages/callback';
import { GetUser } from './StateManager/StateProvider';
import { useStateValue } from './StateManager/StateProvider';
import Actions from './StateManager/actions';
import { getUserAPI } from './api';

function App() {

  const [state, dispatch] = useStateValue();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token)
      return;
    getUserAPI()
      .then((response) => {
        dispatch({
          type: Actions.SET_USER,
          payload: response.data
        })
      })
      .catch((e) => {
        console.log(e, e.response)
        toast.error("مشکلی در دریافت اطلاعات کاربر پیش آمده است!")
      })
  }, [])

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login></Login>}></Route>

        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route path="/callback" element={<Callback></Callback>}></Route>

        {/* <Route path="/movies" element={<PrivateRoute></PrivateRoute>}> */}
          <Route path="/movies" element={<Movies></Movies>}></Route>
        {/* </Route> */}

        <Route path='/movies/:id' element={<PrivateRoute></PrivateRoute>}>
          <Route path='/movies/:id' element={<Moive></Moive>}></Route>
        </Route>


        <Route path='/actors/:id' element={<PrivateRoute></PrivateRoute>}>
          <Route path='/actors/:id' element={<Actor></Actor>}></Route>
        </Route>

        <Route path='/watchlist' element={<PrivateRoute></PrivateRoute>}>
          <Route path="/watchlist" element={<Watchlist></Watchlist>}></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>

      </Routes>
    </Router>
  );
}

export default App;