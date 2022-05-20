import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callbackAPI } from "../../api";

const Callback = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    callbackAPI(code)
    return;
}

export default Callback;