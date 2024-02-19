import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailError, setEmailError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError('');
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        }
    ;}
    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter an email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
          }
        register();
        // // Check if email has an account associated with it
        // checkAccountExists(accountExists => {
        //     // If yes, log in 
        //     if (accountExists)
        //         logIn()
        //     else
        //     // Else, ask user if they want to create a new account and if yes, then log in
        //         if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
        //             logIn()
        //         }
        // })        
  

    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password
    const register = () => {
        console.log( JSON.stringify({email, password, firstName, lastName}))
        fetch("http://localhost:3080/api/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password, firstName, lastName})
        })
        .then(r => r.json())
        .then(r => {
            console.log(r)
            if ('success' === r.message) {
                console.log(r.message)
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                navigate("/login")
            } else {
                window.alert("Email Already exists")
                console.log(r.message)
            }
        })
    }


    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Register</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={firstName}
                placeholder="Enter your first name here"
                onChange={ev => setFirstName(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={lastName}
                placeholder="Enter your last name here"
                onChange={ev => setLastName(ev.target.value)}
                className={"inputBox"} />
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={handlePasswordChange}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={confirmPassword}
                placeholder="reenter your password here"
                onChange={handleConfirmPasswordChange}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Create Account"} />
        </div>
    </div>
}

export default Register