import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../StoreProvider";

function Sidebar({ setDisplay }) {
  const { auth } = useStore();
  const navigate = useNavigate();

  const signout = async () => {
    await auth.signout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="sidebar_items">place logo here</div>
        <div className="sidebar_items" onClick={() => setDisplay(0)}>
          Dashboard
        </div>
        <div className="sidebar_items" onClick={() => setDisplay(1)}>
          Your tasks
        </div>

        <div className="sidebar_items" onClick={() => setDisplay(2)}>
          Create tasks
        </div>

        <div className="sidebar_items" onClick={signout}>
          Sign Out
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
