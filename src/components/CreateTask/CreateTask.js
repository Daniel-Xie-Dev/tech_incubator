import "./CreateTask.css";

import React, { useState } from "react";
import { db } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore/lite";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [img, setImage] = useState("");
  const [description, setDescription] = useState("");

  const submitTask = async () => {
    await addDoc(collection(db, "tasks"), {
      title: title,
      company: null,
      img: null,
      owner: null,
      description: description,
    })
      .then(() => console.log("Successfully inserted document"))
      .catch((err) => console.log("error when inserting document"));

    setTitle("");
    setImage("");
    setDescription("");
  };

  return (
    <div className="CreateTask">
      <div className="CreateTask_Container">
        <h2>Create your own tasks</h2>
        <label>Title: </label>
        <input onChange={(e) => setTitle(e.target.value)}></input>

        <label>Description: </label>
        <textarea
          required
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button onClick={submitTask}>Submit Task</button>
      </div>
    </div>
  );
}

export default CreateTask;
