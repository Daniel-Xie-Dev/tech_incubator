import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { delay, motion } from "framer-motion";

import logo from "../../pictures/logo_transparent.png";

function Sidebar({ setDisplay }) {
  const { signout } = useAPI();
  const navigate = useNavigate();

  const buttons = [
    "Dashboard",
    "Unfinished Task",
    "Completed Task",
    "My Task",
    "Create Task",
    "Setting",
  ];

  const handleSignOut = async () => {
    await await signout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <motion.img className="sidebar_image" src={logo} alt="" onClick={() => setDisplay(0)} />

        {buttons.map((item, index) => {
          return (
            <motion.button
              key={item}
              whileHover={{
                backgroundColor: ["hsl(0, 100, 100)", "hsl(211, 12, 48)"],
                borderRadius: "0px 0px 30px 0px",
              }}
              exit={{}}
              // initial={{ backgroundColor: "white" }}
              className="sidebar_items"
              onClick={() => setDisplay(index)}
            >
              {item}
            </motion.button>
          );
        })}

        <motion.button
          whileHover={{
            backgroundColor: ["hsl(0, 100, 100)", "hsl(211, 12, 48)"],
            borderRadius: "0px 0px 30px 0px",
          }}
          className="sidebar_items"
          onClick={handleSignOut}
        >
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}

export default Sidebar;
