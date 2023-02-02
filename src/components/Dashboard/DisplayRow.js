import "./DisplayRow.css";

import { Card, Button } from "react-bootstrap";
import React from "react";
import { useStore } from "../../StoreProvider";
import useAPI from "../../hooks/useAPI";

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
            <>
              <div className="Item_Container" key={task.id}>
                <Card style={{ width: "18rem" }} className="Card_Container">
                  <Card.Img
                    style={{ width: "18rem" }}
                    variant="top"
                    src={
                      !temp
                        ? temp
                        : "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hbGx8ZW58MHx8MHx8&w=1000&q=80"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{temp.title}</Card.Title>
                    <Card.Text>{temp.description}</Card.Text>

                    {hasSet.has(task.id) ? (
                      <Button variant="primary" onClick={() => removeFromUser(task.id)}>
                        Remove from Task
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={() => addTaskToUser(task.id)}>
                        Add to Task
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayRow;
