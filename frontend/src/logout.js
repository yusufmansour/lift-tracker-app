import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./user_context";

const Logout = () => {
    const { user, login, logout, checkLoggedIn} = useUser();
    const navigate = useNavigate();
    logout();
    navigate("/")

    return <div className={"mainContainer"}>
        
    </div>
}

export default Logout