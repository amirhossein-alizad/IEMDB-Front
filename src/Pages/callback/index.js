import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callbackAPI } from "../../api";
import { useStateValue } from "../../StateManager/StateProvider";
import { toast } from "react-toastify";
import Actions from "../../StateManager/actions";
import { getUserAPI } from "../../api";

const Callback = () => {
    const [state, dispatch] = useStateValue();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    const navigator = useNavigate()

    const getUser = () => {
        const token = localStorage.getItem("token");
        if (!token)
            return;
        getUserAPI()
            .then((response) => {
                dispatch({
                    type: Actions.SET_USER,
                    payload: response.data
                })
                navigator("/movies");
            })
            .catch((e) => {
                console.log(e, e.response)
            })
    }

    const sendCode = () => {
        callbackAPI(code)
            .then(response => {
                toast.info("شما با موفقیت وارد شدید!")
                dispatch({
                    type: Actions.SET_TOKEN,
                    payload: response.data.token
                })
                localStorage.setItem("token", response.data.token);
                getUser();
            })
            .catch((e) => {
                console.log(e, e.response)
            })
    }
    
    useEffect(() => {
        sendCode();
    }, [])
    
    return <div>در حال ارسال اطلاعات</div>;
}

export default Callback;