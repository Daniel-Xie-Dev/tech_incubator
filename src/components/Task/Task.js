import "./Task.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, Button } from "react-bootstrap";
import React, { useState } from "react";

function Task({ data, userHas, addTaskToUser, removeFromUser }) {
  const temp = data.data();
  // console.log(temp);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="Item_Container"
          whileHover={{ scale: 1.1 }}
          style={{ position: isExpanded ? "absolute" : "static" }}
          animate={{ width: "100%", height: "100%" }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Card style={{ width: "16rem" }} className="Card_Container">
            <Card.Img
              style={{ width: "16rem" }}
              variant="top"
              src={
                !temp
                  ? temp
                  : "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hbGx8ZW58MHx8MHx8&w=1000&q=80"
              }
            />
            <Card.Body>
              <Card.Title>Title: {temp.title}</Card.Title>
              <Card.Text>Description: {temp.description}</Card.Text>

              {userHas ? (
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
    </>
  );
}

export default Task;
