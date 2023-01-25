import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Signup() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/')
  })
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log("handlesubmit called");
    e.preventDefault();
    axios.post(`${SERVER_URL}/signup`, formData).then((res)=>{
      if(res.status===200){
        localStorage.setItem("token",res.data.token)
        alert("insertion successful")
        navigate('/')
      }
    }).catch((err)=>{
      alert("error")
    })
  };
  return (
    <div>
      <h1>SIGNUP PAGE</h1>
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
            name="role"
            label="Role"
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="outlined-required-input"
            name="email"
            label="email"
            onChange={handleChange}
          />
          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
          />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Sigup
          </Button>
          <br />
          <Button onClick={() => navigate("/login")}>
            Go to login page
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Signup;
