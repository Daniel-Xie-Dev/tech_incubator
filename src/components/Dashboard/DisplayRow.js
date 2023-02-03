import "./DisplayRow.css";

import React from "react";
import { useStore } from "../../StoreProvider";
import useAPI from "../../hooks/useAPI";
import Task from "../Task/Task";

function DisplayRow({ data, userObjects, setUserObjects }) {
  const { user, currentTask, setCurrentTask } = useStore();
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

  // console.log(ownerSet);

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

  const deleteFromUser = async (docId) => {
    let global = userObjects.map((item) => item.id);
    let index = global.indexOf(docId);
    global = [...userObjects];
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
