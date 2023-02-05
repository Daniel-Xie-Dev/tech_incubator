import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const useAPI = () => {
  const signin = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userData = result.user;
    const currentTaskTemp = await getFieldById("users", userData.uid, "currentTasks");
    const completedTaskTemp = await getFieldById("users", userData.uid, "completedTasks");
    return { userData, currentTaskTemp, completedTaskTemp };
  };

  const signup = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;

    const dataObject = {
      theme: "light",
      company: "Personal",
      currentTasks: [],
      completedTasks: [],
    };

    await createDocumentWithNameInCollectionWithData("users", uid, dataObject);
  };

  const signout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
    // await signOut(auth).then(console.log("signed out")).catch(console.log("unable to sign out"));
  };

  /**
   * @param {String} collectionName
   * @param {String} docId
   * @returns {Object}
   */
  const getDocumentById = async (collectionName, docId) => {
    const document = await getDoc(doc(db, collectionName, docId));
    return document.data();
  };

  /**
   * @param {String} collectionName
   * @returns {Array of Object}
   */
  const getDocumentsByCollection = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs;
  };

  /**
   * @name queryDocuments
   * @param {String} collectionName
   * @param {Object} filter
   * @returns {Array}
   */
  const queryDocuments = async (collectionName, filter) => {
    const q = query(collection(db, collectionName), filter);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs;
  };

  const createDocumentWithNameInCollectionWithData = async (
    collectionName,
    documentName,
    dataObject
  ) => {
    await setDoc(doc(db, collectionName, documentName), dataObject);
  };

  const createDocumentInCollectionWithData = async (collectionName, dataObject) => {
    await addDoc(collection(db, collectionName), dataObject);
  };

  const getFieldById = async (collectionName, documentName, fieldName) => {
    const result = await getDocumentById(collectionName, documentName);
    const data = result[fieldName];
    return data;
  };

  const updateDocumentField = async (collectionName, documentName, fieldName, data) => {
    try {
      await updateDoc(doc(db, collectionName, documentName), {
        [fieldName]: data,
      });
    } catch (eror) {
      console.log("error");
    }
  };

  const updateDocumentFieldArray = async (collectionName, documentName, fieldName, data, isAdd) => {
    try {
      await updateDoc(doc(db, collectionName, documentName), {
        [fieldName]: isAdd ? arrayUnion(data) : arrayRemove(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDocumentFromCollection = async (collectionName, documentName) => {
    try {
      await deleteDoc(doc(db, collectionName, documentName));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signin,
    signup,
    signout,
    getDocumentById,
    getDocumentsByCollection,
    queryDocuments,
    updateDocumentField,
    updateDocumentFieldArray,
    createDocumentInCollectionWithData,
    deleteDocumentFromCollection,
  };
};

export default useAPI;
