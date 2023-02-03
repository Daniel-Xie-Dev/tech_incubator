import "./DisplayRow.css";

import React from "react";
import { useStore } from "../../StoreProvider";
import useAPI from "../../hooks/useAPI";
import Task from "../Task/Task";

function DisplayRow({ data }) {
  const { user, currentTask, setCurrentTask } = useStore();
  const { updateDocumentFieldArray } = useAPI();
  const uid = user.uid;

  const hasSet = new Set();
  currentTask.forEach((item) => {
    hasSet.add(item);
  });

  const addTaskToUser = async (docId) => {
    let global = [...currentTask];
    global.push(docId);
    setCurrentTask(global);
    await updateDocumentFieldArray("users", uid, "currentTasks", docId, true);
  };

  const removeFromUser = async (docId) => {
    // console.log(docId);
    let global = [...currentTask];
    let index = global.indexOf(docId);
    global.splice(index, 1);
    setCurrentTask(global);
    await updateDocumentFieldArray("users", uid, "currentTasks", docId, false);
  };

  return (
    <div className="DisplayRow">
      <div className="DisplayRow_Container">
        {data.map((task, index) => {
          const temp = task.data();

          return (
            <Task
              key={temp.id}
              data={task}
              userHas={hasSet.has(task.id)}
              addTaskToUser={addTaskToUser}
              removeFromUser={removeFromUser}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DisplayRow;
