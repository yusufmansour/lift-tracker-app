import React from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "./user_context";

const Home = () => {
    const { user, login, logout, checkLoggedIn } = useUser();
    console.log("user",user)
    //checkLoggedIn(user)
    //const { loggedIn, email } = props
    const navigate = useNavigate();
    const onClickLoginButton = () => {
        navigate("/login")
    }
    const onClickRegisterButton = () => {
        navigate("/register")
    }

    return <div>
        <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onClickLoginButton}
                value="Log in" />
            <input
                className={"inputButton"}
                type="button"
                onClick={onClickRegisterButton}
                value="Register" />
        </div>

    </div>
    </div>
}

export default Home