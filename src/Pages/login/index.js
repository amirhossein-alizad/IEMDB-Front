import React, { useEffect, useState } from "react";
import './../../css/signup_login.css';
import './../../css/base.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../../api";
import { useStateValue } from "../../StateManager/StateProvider";
import Actions from "../../StateManager/actions";


const Login = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setisLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleLogin = (e) => {
    e.preventDefault();
    setisLoading(true);
    LoginAPI({ username, password })
      .then((response) => {
        toast.info("شما با موفقیت وارد شدید!")
        setisLoading(false);
        dispatch({
          type: Actions.SET_USER,
          payload: response.data
        })
        navigator("/movies");
      })
      .catch((e) => {
        console.log(e, e.response)
        setisLoading(false)
        toast.error("نام کاربری یا رمز عبور اشتباه است!")
      })
  }

  return (
    <div className="bg-image">
      <div className="login-form">
        <form>
          <h1>ورود</h1>
          <div className="content">
            <div className="input-field">
              <input type="text" placeholder="نام کاربری" autoComplete="nope" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="رمز عبور" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <a href="#" className="link">رمز عبور خود را فراموش کرده اید؟</a>
            <a href="https://github.com/login/oauth/authorize?client_id=106f2d2754b000d6c3a0&scope=user">لاگین با گیت هاب</a>
          </div>
          <div className="action">
            <button onClick={() => navigator("/signup")}>ثبت نام</button>
            <button onClick={(e) => handleLogin(e)}>
              <span>ورود</span>
              {isLoading ? <div className="spinner-border" style={{ width: "1rem", height: "1rem" }} role="status"></div> : null}
            </button>
            <a href="https://github.com/login/oauth/authorize?client_id=106f2d2754b000d6c3a0&scope=user"></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;