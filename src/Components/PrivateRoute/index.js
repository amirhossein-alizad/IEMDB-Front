import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStateValue } from './../../StateManager/StateProvider';

const PrivateRoute = () => {
  const [state, ] = useStateValue();
  const user = state.user;
  const location = useLocation();
  // console.log(location)
  // if (!user) {
  //   toast.error('برای دسترسی به این بخش باید ابتدا  وارد شوید');
  // }
  return user ? <Outlet /> : <Navigate to="/"></Navigate>
};

export default PrivateRoute;
