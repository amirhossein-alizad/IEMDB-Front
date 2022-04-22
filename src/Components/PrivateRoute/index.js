import React from 'react';
import { Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStateValue } from './../../StateManager/StateProvider';
import Login from '../../Pages/login';

const PrivateRoute = (props) => {
  const [state, ] = useStateValue();
  const user = state.user;
  if (!user) {
    toast.error('برای دسترسی به این بخش باید ابتدا  وارد شوید');
  }
  return user ? <Route {...props} /> : <Route exact path="/login" element={Login}></Route>;
};

export default PrivateRoute;
