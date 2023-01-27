import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import One from "./usecontext/One";
import { AppContext } from "./AppContext";
import Usereducer from "./usereducer/Usereducer";
import Usereducer2 from "./usereducer/Usereducer2";
import Usememo from "./usememo/Usememo";

function App() {
  return (
    <div>
      <Router>
        <AppContext.Provider value={{data:10}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/usecontext" element={<One/>} />
            <Route path="/usereducer" element={<Usereducer/>} />
            <Route path="/usereducer2" element={<Usereducer2/>} />
            <Route path="/usememo" element={<Usememo/>} />
          </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
