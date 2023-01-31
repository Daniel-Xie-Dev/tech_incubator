import "./DisplayRow.css";

import { Card, Button } from "react-bootstrap";
import React from "react";
import { useStore } from "../../StoreProvider";
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { db } from "../../firebase";

function DisplayRow({ data }) {
  const { auth } = useStore();

  const addTaskToUser = async (docId) => {
    const uid = auth.user.uid;

    await updateDoc(doc(db, "users", "" + uid), {
      currentTasks: arrayUnion(docId),
    });
  };

  return (
    <div className="DisplayRow">
      <div className="DisplayRow_Container">
        {data.map((task, index) => {
          const temp = task.data();
          return (
            <div className="Item_Container" key={task.id}>
              <Card style={{ width: "18rem" }}>
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
                  <Button
                    variant="primary"
                    onClick={() => addTaskToUser(task.id)}
                  >
                    Add to Task
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayRow;
