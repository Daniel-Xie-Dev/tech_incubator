import "./Dashboard.css";
import React, { useEffect, useState } from "react";

import DisplayRow from "./DisplayRow";


function Dashboard({tasks, setUserObjects}) {


  return (

    <div className="Dashboard">
  
      {tasks?.map((_, index) => {
        if (index % 2 === 0) {
          return (
            <DisplayRow
              key={index}
              setUserObjects={setUserObjects}
              data={tasks.slice(index, index + 2 > tasks.length ? tasks.length : index + 2)}
            />
          );
        }
        return <></>;
      })}
    </div>
  );
}

export default Dashboard;
