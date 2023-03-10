import "./DisplayRow.css";

import React from "react";
import { useStore } from "../../StoreProvider";
import useAPI from "../../hooks/useAPI";
import Task from "../Task/Task";

function DisplayRow({ data, setUserObjects }) {
  const { user, currentTask, setCurrentTask, completedTask } = useStore();
  const { updateDocumentFieldArray, deleteDocumentFromCollection } = useAPI();
  const uid = user.uid;

  const hasSet = new Set();
  currentTask.forEach((item) => {
    hasSet.add(item);
  });

  const ownerSet = new Set();
  data.forEach((item) => {
    if (item.data().owner === user.uid) {
      ownerSet.add(item.id);
    }
  });

  const completedSet = new Set();
  // console.log(completedTask)

  // console.log(ownerSet);

  const addTaskToUser = async (e, docId) => {
    e.stopPropagation();
    let global = [...currentTask];
    global.push(docId);
    setCurrentTask(global);
    await updateDocumentFieldArray("users", uid, "currentTasks", docId, true);
  };

  const removeFromUser = async (e, docId) => {
    // console.log(docId);
    e.stopPropagation();
    let global = [...currentTask];
    let index = global.indexOf(docId);
    global.splice(index, 1);
    setCurrentTask(global);
    await updateDocumentFieldArray("users", uid, "currentTasks", docId, false);
  };

  const deleteFromUser = async (e, docId) => {
    e.stopPropagation();
    let global = data.map((item) => item.id);
    let index = global.indexOf(docId);
    global = [...data];
    global.splice(index, 1);
    setUserObjects(global);
    await deleteDocumentFromCollection("tasks", docId);
  };

  return (
    <div className="DisplayRow">
      <div className="DisplayRow_Container">
        {data.map((task, index) => {
          return (
            <Task
              key={task.id}
              data={task}
              userHas={hasSet.has(task.id)}
              isOwner={ownerSet.has(task.id)}
              addTaskToUser={addTaskToUser}
              removeFromUser={removeFromUser}
              deleteFromUser={deleteFromUser}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DisplayRow;
