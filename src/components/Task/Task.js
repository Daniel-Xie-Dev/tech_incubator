import "./Task.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, Button } from "react-bootstrap";
import React, { useState } from "react";

function Task({ data, userHas, isOwner, addTaskToUser, removeFromUser, deleteFromUser }) {
  const temp = data.data();
  // console.log(temp);

  return (
    <AnimatePresence>
      <motion.div
        className="Item_Container"
        whileHover={{ scale: 1.05 }}
        // style={{ position: isExpanded ? "absolute" : "static" }}
      >
        <Card style={{ width: "20rem" }} className="Card_Container">
          <Card.Img
            style={{ width: "20rem", height: "12rem" }}
            variant="top"
            src={
              !temp
                ? temp
                : "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hbGx8ZW58MHx8MHx8&w=1000&q=80"
            }
          />
          <Card.Body>
            <Card.Title>Title: {temp.title}</Card.Title>
            <Card.Title>Company: {temp.company ? temp.company : "User"}</Card.Title>
            <Card.Text className="Item_Text">
              Description: {temp.description} loremssadfasfsdfsdasdfasdfsdafasdfsafs
            </Card.Text>

            {isOwner ? (
              <Button variant="primary" onClick={() => deleteFromUser(data.id)}>
                Delete Task
              </Button>
            ) : userHas ? (
              <Button variant="primary" onClick={() => removeFromUser(data.id)}>
                Remove from Task
              </Button>
            ) : (
              <Button variant="primary" onClick={() => addTaskToUser(data.id)}>
                Add to user
              </Button>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default Task;
