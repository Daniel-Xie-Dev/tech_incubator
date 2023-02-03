import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { useStore } from "../../StoreProvider";
import { motion } from "framer-motion";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { signin } = useAPI();
  const { setUser, setCurrentTask, setCompletedTask } = useStore();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email.length !== 0 && password.length !== 0) {
      try {
        const { userData, currentTaskTemp, completedTaskTemp } = await signin(email, password);
        console.log(userData, currentTaskTemp, completedTaskTemp);
        setUser(userData);
        setCurrentTask(currentTaskTemp);
        setCompletedTask(completedTaskTemp);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_form_container">
        {/* <img src="https://sccpss.com/PublishingImages/login1.png" /> */}
        <input
          type={"email"}
          className="login_input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          type={showPass ? "text" : "password"}
          className="login_input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <div className="password_checkbox">
          <label>Show password?</label>
          <input type={"checkbox"} onClick={() => setShowPass(!showPass)}></input>
        </div>

        <motion.button className="login_button" onClick={handleSubmit} whileHover={{ scale: 1.2 }}>
          Login
        </motion.button>
      </div>
    </div>
  );
}

export default Login;
