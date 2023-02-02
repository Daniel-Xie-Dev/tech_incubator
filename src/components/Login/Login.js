import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { useStore } from "../../StoreProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin, signup } = useAPI();
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

  const handleSignup = async () => {
    if (email.length !== 0 && password.length !== 0) {
      try {
        // navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_form_container">
        <label className="login_labels">Email:</label>
        <input
          type={"email"}
          className="login_input"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="login_labels">Password:</label>
        <input
          type={"password"}
          className="login_input"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="login" onClick={handleSubmit}>
          Login
        </button>
        <button className="login" onClick={handleSignup}>
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Login;
