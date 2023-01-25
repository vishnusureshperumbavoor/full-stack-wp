import React, { useEffect} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")) navigate('/login')
    else navigate('/')
  })
  const logout = (()=>{
    localStorage.clear()
  })
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Button variant="contained" onClick={logout}>
            LOGOUT BUTTON
      </Button>
    </div>
  );
}

export default Home;
