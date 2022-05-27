import React, { useState } from "react";
import './../../css/base.css';
import './../../css/signup_login.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignupAPI } from "../../api";
import { useStateValue } from "../../StateManager/StateProvider";
import Actions from "../../StateManager/actions";


const Signup = () => {
  const navigator = useNavigate();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [name, setname] = useState(null);
  const [nickname, setnickname] = useState(null);
  const [birthDate, setbirthDate] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleSignup = (e) => {
    e.preventDefault();
    setisLoading(true);
    SignupAPI({ email, password, name, nickname, birthDate })
      .then((response) => {
        toast.info("ثبت‌نام شما به موفقیت انجام شد!")
        setisLoading(false);
        dispatch({
          type: Actions.SET_USER,
          payload: {
            email: email,
            password: password,
            name: name,
            nickname: nickname,
            birthDate: birthDate
          }
        })
        dispatch({
          type: Actions.SET_TOKEN,
          payload: response.data.token
        })
        localStorage.setItem("token", response.data.token);
        navigator("/movies")
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
        toast.error("اطلاعات را به صورت کامل و درست وارد کنید!")
        setisLoading(false);
        
      })
  }

  return (
    <div className="bg-image">
      <div className="login-form">
        <form>
          <h1>ثبت نام</h1>
          <div className="content">
            <div className="input-field">
              <input type="email" placeholder="ایمیل" autoComplete="nope" onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="password" placeholder="رمز عبور" autoComplete="new-password" onChange={(e) => setpassword(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="text" placeholder="نام" autoComplete="new-password" onChange={(e) => setname(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="text" placeholder="نام مستعار" autoComplete="new-password" onChange={(e) => setnickname(e.target.value)} />
            </div>
            <div className="input-field">
              <input type="text" placeholder="تاریخ تولد" autoComplete="new-password" onChange={(e) => setbirthDate(e.target.value)} />
            </div>
          </div>
          <div className="action">
            <button onClick={(e) => handleSignup(e)}>
              ثبت نام
              {isLoading ? <div className="spinner-border" style={{ width: "1rem", height: "1rem" }} role="status"></div> : null}
            </button>
            <button onClick={(e) => navigator("/")}> ورود </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Signup;
