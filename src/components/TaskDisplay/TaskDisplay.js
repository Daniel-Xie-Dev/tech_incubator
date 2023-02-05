import "./TaskDisplay.css"

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import useAPI from "../../hooks/useAPI";
import { useStore } from "../../StoreProvider";

function TaskDisplay() {

    const {user} = useStore();
    const {getDocumentById, updateDocumentFieldArray} = useAPI();   
    const [document, setDocument] = useState(""); 
    const [link, setLink] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    // console.log(user)

    useEffect(() => {
        const getTaskDocument = async () => {
            const result = await getDocumentById("tasks", id);
            setDocument(result);
            console.log(result)
        }
        getTaskDocument();
    }, [])

    const submitTask = async () => {

        await updateDocumentFieldArray("users", user.uid, "completedTasks", id, true);
        await updateDocumentFieldArray("users", user.uid, "currentTasks", id, false);
        navigate("/home");

    }


  return (
    <div className="TaskDisplay">
      <div className="TaskDisplay_Container">
        {
            document ? (
                <>
                    <h1>{document.title}</h1>
                    <label>Link</label>
                    <input onChange={(e) => setLink(e.target.value)}></input>
                    <button onClick={submitTask}>Submit</button>
                </>

            ) :
            <></>
        }
      </div>
    </div>
  )
}

export default TaskDisplay