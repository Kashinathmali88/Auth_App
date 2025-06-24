import React from "react";
import NavBar from "./componets/NavBar.jsx";
import SingUp from "./componets/SingUp.jsx";
import Login from "./componets/Login.jsx";
import { Routes, Route } from "react-router-dom";
import WelCome from "./componets/WelCome.jsx";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<WelCome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
