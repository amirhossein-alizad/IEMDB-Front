import './../../css/normalize.css';
import './../../css/header.css';
import './../../css/base.css';
import React, { useEffect, useState } from "react";
import Logo from './../../assets/images/logo-image.png'
import { useStateValue } from '../../StateManager/StateProvider';
import { useNavigate } from 'react-router-dom';
import Actions from '../../StateManager/actions';

const Header = ({ showSearch, SearchKey, SearchBy, children }) => {
  const [state, dispatch] = useStateValue();
  const navigator = useNavigate();
  const user = state.user;
  const [searchKey, setSearchKey] = SearchKey
  const [searchBy, setSearchBy] = SearchBy
  const [searchByText, setSearchByText] = useState("جستجو بر اساس:")

  const handleSetSearchBy = (searchBy, searchByText) => {
    setSearchBy(searchBy)
    setSearchByText(searchByText)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: Actions.UNSET_TOKEN,
      payload: null
    })
    dispatch({
      type: Actions.UNSET_USER,
      payload: null
    })
    localStorage.removeItem("token")
    navigator("/")
  }

  return (
    <div className="container-fluid background-color-red">
      <div className="row justify-content-md-center flex-space-between">
        <div className="col-sm-auto">
          <div className="dropdown">
            <svg className="dropdown" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
            </svg>
            <div className="dropdown-content p-1 fit-content">
              {user ? <div className="fit-content m-3"><a className="m-3 color-white" href="#">{user.email}</a></div> : <div className="fit-content m-3"><a className="m-3 color-white" href="/signup">ثبت‌نام</a></div>}
              {user ? <div className="fit-content m-3"><a className="m-3 color-white" href="/watchlist">watchlist</a></div> : <div className="fit-content m-3"><a className="m-3 color-white" href="/">ورود</a></div>}
              {user ? <div className="fit-content m-3"><a className="m-3 color-white" href="/" onClick={e => logout(e)}>logout</a></div> : null }
            </div>
          </div>
        </div>
        <div className="col-2">

        </div>
        {showSearch ? (
          <div className="col">
            <form action="/" method="post" className="flex-center">
              <div className="background-color-white search-bar p-2 mx-2 fit-content">
                <svg height="1.5rem" width="1.5rem" className="color-red background-color-white search-bar"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
                  preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                  <path fill="currentColor"
                    d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                </svg>
                <input type="text" id="search_key" className="search-bar ltr" palceholder={searchKey} onChange={e => setSearchKey(e.target.value)} />
              </div>
              <div className="background-color-white search-bar p-2 mx-2 search-by-width">
                <div className="dropdown">
                  <svg className="dropdown" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em"
                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64">
                    <path fill="#ec1c24"
                      d="M1.543 9.192c9.107 16.636 18.215 33.26 27.32 49.898a3.575 3.575 0 0 0 6.327 0c9.108-16.636 18.215-33.26 27.32-49.898c1.409-2.571-.387-5.902-3.163-5.902H4.698c-1.54 0-2.571.828-3.111 1.949c-.676 1.068-.859 2.488-.052 3.953" />
                  </svg>
                  <span>{searchByText}</span>
                  <div className="dropdown-content p-2 search-by-width">
                    <a className="color-white m-2" onClick={(e) => handleSetSearchBy('name', 'نام')}>نام</a>
                    <a className="color-white m-2" onClick={(e) => handleSetSearchBy('genre', 'ژانر')}>ژانر</a>
                    <a className="color-white m-2" onClick={(e) => handleSetSearchBy('date', 'تاریخ تولید')}>تاریخ تولید</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="col"></div>
          </>
        )
        }
        <div className={"col-sm-auto p-0"}>
          <img src={Logo} alt="IEMDB" className="iemdb-img" />
        </div>
      </div>
    </div>
  )
}

export default Header;