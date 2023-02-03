import "./Introduction.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Introduction() {
  const navigate = useNavigate();

  return (
    <div className="Introduction">
      <h1>Welcome to Tech-Incubator</h1>
      <h3>Feel free to explore our site</h3>
      <div className="Introduction_Container">
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </motion.button>
      </div>
    </div>
  );
}

export default Introduction;
