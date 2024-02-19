import React, { useEffect, useState } from "react"

import Navbar from './navbar';
import { useUser } from "./user_context";


const Profile = () => {
    
    const { user, login, logout, checkLoggedIn } = useUser();
    console.log(user);
    //console.log(user.firstName);
    useEffect(() => {
 
      }, []); // Empty dependency array ensures the effect runs once on mount
    
    return <div>
        <Navbar/>
        
        {user ? (
        // Render your component or content when myVariable is available
        <>

                <div>
                    Welcome {user.firstName} {user.lastName}!
                </div></>
      ) : (
        // Render a loading state or placeholder if myVariable is still null
        <p>Loading...</p>
      )}
    </div>
}

export default Profile