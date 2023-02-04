import "./UserTask.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../StoreProvider";
import { where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import Dashboard from "../Dashboard/Dashboard";

function UserTask() {
  const [userObjects, setUserObjects] = useState([]);

  const { user } = useStore();

  // console.log(currentTask);

  const { queryDocuments } = useAPI();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    const getUserCreatedTask = async () => {
      const filter = where("owner", "==", user.uid);
      const result = await queryDocuments("tasks", filter);
      setUserObjects(result);
    };

    getUserCreatedTask();
  }, []);

  return (
    <div className="UserTask">
      <h1>My Task</h1>

      <Dashboard tasks={userObjects} setUserObjects={setUserObjects}/>
      {/* <DisplayRow data={userObjects} userObjects={userObjects} setUserObjects={setUserObjects} /> */}
      {/* <h1>Completed Task</h1>
      <DisplayRow data={completedObjects} /> */}
    </div>
  );
}

export default UserTask;
