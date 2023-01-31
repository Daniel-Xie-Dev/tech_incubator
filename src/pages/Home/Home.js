import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";
import CreateTask from "../../components/CreateTask/CreateTask";

function Home() {
  const [display, setDisplay] = useState(0);

  const renderSwitch = () => {
    switch (display) {
      case 0:
        return <Dashboard />;
      case 1:
        return "Your Tasks";
      case 2:
        return <CreateTask />;
      default:
        return <></>;
    }
  };

  return (
    <div className="Home">
      <div className="Sidebar_container">
        <Sidebar setDisplay={setDisplay} />
      </div>

      <div className="Display_container">{renderSwitch()}</div>

      <div></div>
    </div>
  );
}

export default Home;
