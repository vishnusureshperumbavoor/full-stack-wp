import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [Data, FormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    FormData({ ...Data, [name]: value });
    console.log(Data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      const response = axios.post("http://localhost:5000/login", Data)
      console.log(response.data)
      alert("login successful")
      navigate('localhost:5000/session')
    }catch(error){
      console.error(error)
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username : </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={Data.username}
        />
        <br />
        <br />
        <label htmlFor="">Password : </label>
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={Data.password}
        />
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Login;
