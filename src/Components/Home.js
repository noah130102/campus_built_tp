import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () =>{
    localStorage.removeItem("userData");
    localStorage.removeItem("tasks");
    navigate("/signup");
  }
  const handleTask = () =>{
    navigate("/taskboard");
  }
  return (
    <div>
      <div>
        <button onClick={handleSignUp}>SignUp</button>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <button onClick={handleTask}>TaskBoard</button>
      </div>
    </div>
  );
};

export default Home;
