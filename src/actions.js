import { firebaseApp } from "./firebase";
import * as firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const getCollection = async (collection) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const data = await db.collection(collection).get();
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (collection, data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const response = await db.collection(collection).add(data);
    result.data = { id: response.id };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};
