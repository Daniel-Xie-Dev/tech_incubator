import "./Dashboard.css";
import React, { useEffect, useState } from "react";

import DisplayRow from "./DisplayRow";
import useAPI from "../../hooks/useAPI";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const { getDocumentsByCollection } = useAPI();

  useEffect(() => {
    const getTasks = async () => {
      const result = await getDocumentsByCollection("tasks");
      setTasks(result);
    };

    getTasks();
  }, []);

  return (
    <div className="Dashboard">
      {tasks?.map((_, index) => {
        if (index % 5 === 0) {
          return (
            <DisplayRow
              key={index}
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
