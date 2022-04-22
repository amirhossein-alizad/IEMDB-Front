import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLoggedInUser } from '../../redux/auth/authSelector';
import { useReduxSelector } from '../../redux/store';

const PrivateRoute = (props) => {
  const user = useReduxSelector(getLoggedInUser());
  if (!user) {
    toast.error('برای دسترسی به این بخش باید ابتدا  وارد شوید');
  }
  return user ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
