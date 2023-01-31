import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../StoreProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useStore();
  // console.log(auth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email.length !== 0 && password.length !== 0) {
      const res = await auth.signin(email, password);
      if (res) {
        navigate("/home");
      }
    } else {
      return;
    }
    // navigate("/home");
  };

  const handleSignup = async () => {
    if (email.length !== 0 && password.length !== 0) {
      await auth.signup(email, password);
      navigate("/home");
    } else {
      return;
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
