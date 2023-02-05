import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login-Signup/Login";
import Home from "./pages/Home/Home";
import Introduction from "./pages/Introduction/Introduction";
import Signup from "./pages/Login-Signup/Signup";
import TaskDisplay from "./components/TaskDisplay/TaskDisplay";
// import SubmitModal from "./components/SubmitModal/SubmitModal";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/task/:id" element={<TaskDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
