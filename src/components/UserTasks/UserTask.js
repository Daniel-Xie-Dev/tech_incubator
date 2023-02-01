import "./UserTask.css";
import React, { useEffect, useState } from "react";
import { useStore } from "../../StoreProvider";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DisplayRow from "../Dashboard/DisplayRow";

function UserTask() {
  const [currentObjects, setCurrentObjects] = useState([]);
  const [completedObjects, setCompletedObjects] = useState([]);

  const { auth } = useStore();
  const navigate = useNavigate();

  if (!auth.user) {
    navigate("/");
  }

  useEffect(() => {
    const getCurrentTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        where("__name__", "in", auth.currentTask)
      );

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs);
      querySnapshot.docs.forEach((item) => {
        console.log(item.data());
      });
      setCurrentObjects(querySnapshot.docs);
    };

    const getCompletedTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        where(
          "__name__",
          "in",
          auth.completedTask.length === 0 ? ["temp"] : auth.completedTask
        )
      );

      const querySnapshot = await getDocs(q);
      setCompletedObjects(querySnapshot.docs);
    };

    getCurrentTasks();
    getCompletedTasks();
  }, []);

  return (
    <div className="UserTask">
      <h1>Current Task</h1>
      <DisplayRow data={currentObjects} />;
    </div>
  );
}

export default UserTask;
