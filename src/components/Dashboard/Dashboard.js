import "./Dashboard.css";
import React, { useEffect, useState } from "react";

import DisplayRow from "./DisplayRow";

function Dashboard({ tasks, setUserObjects }) {
  return (
    <div className="Dashboard">
      {tasks?.map((_, index) => {
        if (index % 5 === 0) {
          return (
            <DisplayRow
              key={index}
              setUserObjects={setUserObjects}
              data={tasks.slice(index, index + 5 > tasks.length ? tasks.length : index + 5)}
            />
          );
        }
        return <></>;
      })}
    </div>
  );
}

export default Dashboard;
