import "./Task.css";
import { AnimatePresence, motion } from "framer-motion";
import { Card, Button} from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Task({ data, userHas, isOwner, addTaskToUser, removeFromUser, deleteFromUser }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const temp = data.data();
  // console.log(temp);

  const selectButtonType = () => {
    if(userHas){
      return (
        <Button variant="primary" onClick={() => removeFromUser(data.id)}>
          Remove from Task
        </Button>
      )
    }else if(isOwner){
      return (
        <Button variant="primary" onClick={() => deleteFromUser(data.id)}>
          Delete Task
        </Button>
      )
    }else {
      return (
        <Button variant="primary" onClick={() => addTaskToUser(data.id)}>
          Add to user
        </Button>
      )
    }
  }

  return (
    <AnimatePresence>
      
      <motion.div
        className="Item_Container"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate(`/task/${data.id}`)}
        // style={{ position: isExpanded ? "absolute" : "static" }}
      >
        <Card style={{ width: "18rem" }} className="Card_Container">
          <Card.Img
            style={{ width: "18rem", height: "12rem" }}
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

            {
              selectButtonType()
            }

          </Card.Body>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export default Task;
