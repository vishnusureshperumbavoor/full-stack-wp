import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    //body: JSON.stringify(searchInput),
    credentials: "include",
  };
  let axiosConfig = {
    withCredentials: true,
  };
  //axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [Data, FormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    FormData({ ...Data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/login", Data,options);
      //console.log(response.data)
      //alert("login successful")
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      console.log(response);
    });
  }, []);

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
