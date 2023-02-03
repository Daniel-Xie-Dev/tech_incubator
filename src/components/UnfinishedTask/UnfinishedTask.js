import "./UnfinishedTask.css";

import React, { useEffect, useState } from "react";
import { useStore } from "../../StoreProvider";
import { where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import DisplayRow from "../Dashboard/DisplayRow";
import useAPI from "../../hooks/useAPI";

function UnfinishedTask() {
  const [currentObjects, setCurrentObjects] = useState([]);

  const { user, currentTask } = useStore();

  // console.log(currentTask);

  const { queryDocuments } = useAPI();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const getCurrentTasks = async () => {
      const filter = where("__name__", "in", currentTask.length === 0 ? ["temp"] : currentTask);
      const result = await queryDocuments("tasks", filter);
      setCurrentObjects(result);
    };

    getCurrentTasks();
    // getCompletedTasks();
  }, [currentTask]);

  return (
    <div className="UnfinishedTask">
      <h1 className="UnfinishedTask_Header">Unfinished Task</h1>
      <DisplayRow data={currentObjects} />
    </div>
  );
}

export default UnfinishedTask;
