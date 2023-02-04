import "./General.css"

import React, { useState, useEffect } from 'react'
import useAPI from "../../hooks/useAPI";
import Dashboard from "../Dashboard/Dashboard";

function General() {
    const [tasks, setTasks] = useState([]);
    const {getDocumentsByCollection} = useAPI();

    useEffect(() => {
        const getTasks = async () => {
          const result = await getDocumentsByCollection("tasks");
          setTasks(result);
        };
    
        getTasks();
      }, []);

  return (
    <div className="General">
        <Dashboard tasks={tasks}/>
    </div>
  )
}

export default General