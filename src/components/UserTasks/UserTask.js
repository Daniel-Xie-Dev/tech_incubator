import "./UserTask.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../StoreProvider";
import { where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import DisplayRow from "../Dashboard/DisplayRow";
import useAPI from "../../hooks/useAPI";

function UserTask() {
  const [currentObjects, setCurrentObjects] = useState([]);
  const [completedObjects, setCompletedObjects] = useState([]);

  const { user, currentTask, completedTask } = useStore();

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

    const getCompletedTasks = async () => {
      const filter = where("__name__", "in", completedTask.length === 0 ? ["temp"] : completedTask);
      const result = await queryDocuments("tasks", filter);
      setCompletedObjects(result);
    };

    getCurrentTasks();
    getCompletedTasks();
    // getCompletedTasks();
  }, [currentTask, completedTask]);

  return (
    <div className="UserTask">
      <h1>Current Task</h1>
      <DisplayRow data={currentObjects} />
      <h1>Completed Task</h1>
      <DisplayRow data={completedObjects} />
    </div>
  );
}

export default UserTask;
