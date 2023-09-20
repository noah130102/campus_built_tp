import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";
import TaskBoard from "./TaskBoard";

const isAuthenticated = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData && userData.email; // Change this condition based on your authentication logic.
};

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return element;
  } else {
    // Use useNavigate to redirect to the login page
    navigate("/");
    return null;
  }
};

const RoutingLib = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/taskboard"
            element={<PrivateRoute element={<TaskBoard />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutingLib;
