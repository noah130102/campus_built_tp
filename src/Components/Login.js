import React, { useState } from "react";
import { enc, SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.email === formData.email) {
      const hashedInputPassword = SHA256(formData.password).toString(enc.Hex);

      if (hashedInputPassword === userData.password) {
        navigate("/taskboard");
        
        return;
      }
    }

    alert("Wrong email or password. Please try again.");
  };

  return (
    <div className="container blue-page">
      <div className="blur-background"></div>
      <div className="form">
        <h1>Log in! </h1>
        <form onSubmit={handleSubmit}>
          
          <div class="tes">
            <div class="input-container">
              <label className="textSize" for="email" class="input-label">
                Email Address
              </label>
              <input
                className="input2"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div class="tes">
            <div class="input-container">
              <input
                className="input2"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <label for="password" class="input-label">
                Password
              </label>
            </div>
          </div>
          <div className="tes tes2">
            <label className="labelClass textSize ">
              <div className="checkbox1" >
                <input  type="checkbox" name="rememberMe" />
                <div className="">remember me</div>
              </div>
            </label>
            <div className="forgot textSize">
              <button className="tes3 " type="submit">
                forgot password?
              </button>
            </div>
          </div>

          <button className="tes loginButt" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
