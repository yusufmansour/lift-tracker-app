import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import OverviewGrid from './overview_page';
import Profile from './profile';
import Logout from './logout';
import { UserProvider } from "./user_context";
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //const { user, login, logout, checkLoggedIn } = useUser();
  // useEffect(() => {

  //   // If the token exists, verify it with the auth server to see if it is valid
  //   fetch("http://localhost:3080/api/verify", {
  //           method: "POST",
  //           headers: {
  //               'jwt-token': user.token
  //             }
  //       })
  //       .then(r => r.json())
  //       .then(r => {
  //           setLoggedIn('success' === r.message)
  //           setEmail(user.email || "")
  //       })
  // }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/overview" element={<OverviewGrid/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/overview_page" element={<OverviewGrid />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;