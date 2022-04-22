import './css/base.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/login';
import Signup from './Pages/signup';
import { toast } from 'react-toastify';
import NotFound from './Pages/notFound';
import Movies from './Pages/movies';

function App() {
  return (
    <Router>
        <Routes>
          
          <Route path="/" element={<Login></Login>}></Route>

          <Route path="/signup" element={<Signup></Signup>}></Route>

          <Route path="/movies" element={<Movies></Movies>}></Route>
          
          {/* <PrivateRoute exact path="/movies">

          </PrivateRoute> */}

          {/* <PrivateRoute exact path="/movies/:id">

          </PrivateRoute>

          <PrivateRoute exact path="/actors/:id">

          </PrivateRoute>

          <PrivateRoute exact path="/watchlist">
            
          </PrivateRoute> */}

          <Route path="*" element={<NotFound></NotFound>}></Route>

        </Routes>
    </Router>
  );
}

export default App;
