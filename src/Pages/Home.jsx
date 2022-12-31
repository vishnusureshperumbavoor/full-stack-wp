import React, { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getdata");
    //const response = await fetch("http://localhost:5000/getdata");
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{data}</p>
    </div>
  );
}

export default Home;
