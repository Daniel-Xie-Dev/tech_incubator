import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [currentTask, setCurrentTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const signup = async (email, password) => {
    let userData = null;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const temp = userCredential.user;
        userData = temp;
        setUser(temp);
      })
      .catch((error) => {
        console.log(error.message);
        return false;
      });

    await setDoc(doc(db, "users", "" + userData.uid), {
      currentTasks: [],
      completedTasks: [],
    });

    return true;
  };

  const signin = async (email, password) => {
    // console.log(email);
    let userData = null;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        userData = user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    await getDoc(doc(db, "users", "" + userData.uid))
      .then((data) => {
        setCurrentTask(data.get("currentTasks"));
        setCompletedTask(data.get("completedTasks"));
      })
      .catch((error) => {
        console.log("Unable to retrieve user tasks");
        return false;
      });

    return true;
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("successfully logged out");
        setUser(null);
      })
      .catch((error) => {
        console.log("Error in signing out. " + error);
      });
  };

  return {
    user,
    currentTask,
    completedTask,
    signup,
    signin,
    signout,
  };
};

export default useAuth;
