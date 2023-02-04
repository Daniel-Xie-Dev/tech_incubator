import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";

import CreateTask from "../../components/CreateTask/CreateTask";
import UserTask from "../../components/UserTasks/UserTask";
import UnfinishedTask from "../../components/UnfinishedTask/UnfinishedTask";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import General from "../../components/General/General";

function Home() {
  const [display, setDisplay] = useState(0);

  const renderSwitch = () => {
    switch (display) {
      case 0:
        return <General />;
      case 1:
        return <UnfinishedTask />;
      case 2:
        return <CompletedTask />;
      case 3:
        return <UserTask />;
      case 4:
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
