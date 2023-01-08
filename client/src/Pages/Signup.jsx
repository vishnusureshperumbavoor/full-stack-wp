import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/signup",formData)
    alert("signup successful")
    navigate('/login')
  };

  return (
    <div>
      <h1>SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name : </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <br />
        <label htmlFor="">Username : </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <br />
        <br />
        <label htmlFor="">Password : </label>
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Signup;
