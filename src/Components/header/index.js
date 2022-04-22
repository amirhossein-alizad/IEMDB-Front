import './../../css/normalize.css';
import './../../css/header.css';
import './../../css/base.css';
import React from "react";
import Logo from './../../assets/images/logo-image.png'

const Header = (showSearch) => {
  return (
    <div class="container-fluid background-color-red">
      <div class="row justify-content-md-center flex-space-between">
        <div class="col-sm-auto">
          <div class="dropdown">
            <svg class="dropdown" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
              role="img" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10s10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
            </svg>
            <div class="dropdown-content p-1 fit-content">
              <div class="fit-content m-3"><a class="m-3 color-white" href="#">ثبت‌نام</a></div>
              <div class="fit-content m-3"><a class="m-3 color-white" href="#">pkootzari@gmail.com</a></div>
            </div>
          </div>
        </div>
        <div class="col-2">

        </div>
        {showSearch ? (
          <div class="col">
            <form action="/" method="post" class="flex-center">
              <div class="background-color-white search-bar p-2 mx-2 fit-content">
                <svg height="1.5rem" width="1.5rem" class="color-red background-color-white search-bar"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"
                  preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                  <path fill="currentColor"
                    d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1c-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                </svg>
                <input type="text" id="search_key" class="search-bar ltr" />
              </div>
              <div class="background-color-white search-bar p-2 mx-2 search-by-width">
                <div class="dropdown">
                  <svg class="dropdown" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em"
                    preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64">
                    <path fill="#ec1c24"
                      d="M1.543 9.192c9.107 16.636 18.215 33.26 27.32 49.898a3.575 3.575 0 0 0 6.327 0c9.108-16.636 18.215-33.26 27.32-49.898c1.409-2.571-.387-5.902-3.163-5.902H4.698c-1.54 0-2.571.828-3.111 1.949c-.676 1.068-.859 2.488-.052 3.953" />
                  </svg>
                  <span> جستجو بر اساس:</span>
                  <div class="dropdown-content p-2 search-by-width">
                    <a class="color-white m-2">نام</a>
                    <a class="color-white m-2">ژانر</a>
                    <a class="color-white m-2">تاریخ تولید</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : null}
        <div class="col-sm-auto p-0">
          <img src={Logo} alt="IEMDB" class="iemdb-img" />
        </div>
      </div>
    </div>
  )
}

export default Header;