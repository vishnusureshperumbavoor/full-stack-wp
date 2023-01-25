import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) navigate('/')
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${SERVER_URL}/login`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("welcome to the future");
          localStorage.setItem("token",res.data.token);
          navigate('/')
        }
      })
      .catch((err) => {
        alert("error");
      });
  };
  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required-input"
            name="username"
            label="Username"
            onChange={handleChange}
            value={formData.name}
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            value={formData.name}
          />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <br />
          <Button onClick={() => navigate("/signup")}>Go to signup page</Button>
        </div>
      </Box>
    </div>
  );
}

export default Login;
