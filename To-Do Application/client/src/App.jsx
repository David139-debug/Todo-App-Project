import React from "react";
import Wrapper1 from "./Wrapper1/Wrapper1.jsx";
import Wrapper2 from "./Wrapper2/Wrapper2.jsx";
import Wrapper3 from "./Wrapper3/Wrapper3.jsx";
import Login from "./Login/Login.jsx";
import TodoWrapper1 from "./ToDoApp/TodoWrapper1.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Wrapper1 />
              <Wrapper2 />
              <Wrapper3 />
            </>
          }
        />
        <Route path="/login" element={<Login key={location.key}/>} />
        <Route path="/todo" element={<TodoWrapper1 key={location.key}/>} />
      </Routes>
    </Router>
  );
}

export default App;
