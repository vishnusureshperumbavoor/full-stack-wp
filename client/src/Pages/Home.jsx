import React, { useEffect} from "react";
import axios from "axios";

function Home() {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    //body: JSON.stringify(searchInput),
    credentials: "include",
  };
  useEffect(() => {
    axios.get("http://localhost:5000/login",options).then((response)=>{
      console.log(response);
    })
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
