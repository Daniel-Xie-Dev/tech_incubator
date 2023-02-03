import "./CreateTask.css";
import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import { useStore } from "../../StoreProvider";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [img, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const { user } = useStore();
  // console.log(user);
  const { createDocumentInCollectionWithData } = useAPI();

  const submitTask = async () => {
    const object = {
      title: title,
      company: null,
      img: null,
      owner: user.uid,
      date: date,
      time: time,
      description: description,
    };

    await createDocumentInCollectionWithData("tasks", object);
    console.log(object);
    setTitle("");
    setImage("");
    setDescription("");
  };

  return (
    <div className="CreateTask">
      <div className="CreateTask_Container">
        <h1>Create your own tasks</h1>
        <label className="CreateTask_Label">Title </label>
        <input onChange={(e) => setTitle(e.target.value)}></input>

        <label className="CreateTask_Label">Company </label>
        <input
          onChange={(e) => setCompany(e.target.value)}
          placeholder={"Leave blank if you are not affilated with a company"}
        ></input>

        <label className="CreateTask_Label">Description </label>
        <textarea
          className="CreateTask_TextArea"
          required
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="CreateTask_DueDate">
          <label className="CreateTask_Label">Pick due date</label>
          <input type={"date"} onChange={(e) => setDate(e.target.value)}></input>
          <label className="CreateTask_Label">Pick time of submission</label>
          <input type={"time"} onChange={(e) => setTime(e.target.value)}></input>
        </div>

        <button onClick={submitTask}>Submit Task</button>
      </div>
    </div>
  );
}

export default CreateTask;
