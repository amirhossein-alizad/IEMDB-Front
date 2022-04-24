import './css/base.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/login';
import Signup from './Pages/signup';
import { toast } from 'react-toastify';
import NotFound from './Pages/notFound';
import Movies from './Pages/movies';
import { useStateValue } from './StateManager/StateProvider';
import Actions from './StateManager/actions';
import Moive from './Pages/movie';
import Actor from './Pages/actor';
import Watchlist from './Pages/watchlist';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login></Login>}></Route>

        <Route path="/signup" element={<Signup></Signup>}></Route>

        {/* <Route path="/movies" element={<PrivateRoute></PrivateRoute>}> */}
          <Route path="/movies" element={<Movies></Movies>}></Route>
        {/* </Route> */}

        {/* <Route path='/movies/:id' element={<PrivateRoute></PrivateRoute>}> */}
          <Route path='/movies/:id' element={<Moive></Moive>}></Route>
        {/* </Route> */}


        {/* <Route path='/actors/:id' element={<PrivateRoute></PrivateRoute>}> */}
          <Route path='/actors/:id' element={<Actor></Actor>}></Route>
        {/* </Route> */}

        {/* <Route path='/watchlist' element={<PrivateRoute></PrivateRoute>}> */}
          <Route path="/watchlist" element={<Watchlist></Watchlist>}></Route>
        {/* </Route> */}

        <Route path="*" element={<NotFound></NotFound>}></Route>

      </Routes>
    </Router>
  );
}

export default App;

export const Logout = () => {
  const [state, dispatch] = useStateValue()
  dispatch({
    type: Actions.UNSET_USER,
    payload: null
  })
}
