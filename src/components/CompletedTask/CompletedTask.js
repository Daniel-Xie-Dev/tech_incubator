import "./CompletedTask.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../StoreProvider";
import { where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import DisplayRow from "../Dashboard/DisplayRow";
import useAPI from "../../hooks/useAPI";

function CompletedTask() {
  const [completedObjects, setCompletedObjects] = useState([]);

  const { user, completedTask } = useStore();

  // console.log(currentTask);

  const { queryDocuments } = useAPI();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const getCompletedTasks = async () => {
      const filter = where("__name__", "in", completedTask.length === 0 ? ["temp"] : completedTask);
      const result = await queryDocuments("tasks", filter);
      setCompletedObjects(result);
    };

    getCompletedTasks();
    // getCompletedTasks();
  }, [completedTask]);

  return (
    <div className="CompletedTask">
      <h1>Completed Task</h1>
      <DisplayRow data={completedObjects} />
    </div>
  );
}

export default CompletedTask;
