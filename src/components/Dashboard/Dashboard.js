import "./Dashboard.css";
import React, { useEffect, useState } from "react";

import DisplayRow from "./DisplayRow";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../firebase";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setTasks(querySnapshot.docs);
      console.log(querySnapshot.docs);
      querySnapshot.forEach((doc) => {
        console.log(querySnapshot.docs.length);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
    };

    getTasks();
  }, []);

  return (
    <div className="Dashboard">
      {tasks?.map((_, index) => {
        if (index % 2 === 0) {
          return (
            <DisplayRow
              key={index}
              data={tasks.slice(
                index,
                index + 2 > tasks.length ? -1 : index + 2
              )}
            />
          );
        }
        return <></>;
      })}
    </div>
  );
}

export default Dashboard;
