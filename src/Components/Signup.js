import React, { useState } from "react";
import { enc, SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file (assuming the same CSS is used for both pages)

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    acceptedTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      alert("You must accept the terms and conditions to sign up.");
      return;
    }

    const hashedPassword = SHA256(formData.password).toString(enc.Hex);

    localStorage.removeItem("userData");

    localStorage.setItem(
      "userData",
      JSON.stringify({ ...formData, password: hashedPassword })
    );

    alert("User data has been saved to local storage!");
    navigate("/login");
  };

  return (
    <div className="container blue-page">
      <div className="blur-background"></div>
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="tes">
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                className="input2"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="tes">
            <div className="input-container">
              <label className="input-label " htmlFor="email">
                Email Address
              </label>
              <input
                className="input2 emailinput"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="tes">
            <div className="input-container">
              <label className="input-label " htmlFor="password">
                Password
              </label>
              <input
                className="input2"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="tes tes2">
            <label className="labelClass textSize">
              <div className="checkbox1">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleInputChange}
                  required
                />
                <div className="">I accept the terms and conditions</div>
              </div>
            </label>
          </div>
          <button type="submit" className="tes loginButt">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
