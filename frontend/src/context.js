import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { db, collection, query, getDocs } from "./firebase";

const AppContext = React.createContext();

const defaultState = {
  user: null,
  courses: [],
  users: [],
  registeredCourses: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchCourses = async () => {
    const q = query(collection(db, "courses"));

    const querySnapshot = await getDocs(q);
    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: "SET_COURSES", payload: courses });
  };

  const fetchUsers = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const usersArray = [];
    querySnapshot.forEach((doc) => {
      usersArray.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: "SET_USERS", payload: usersArray });
  };

  const fetchRegisteredCourses = async () => {
    const q = query(collection(db, "registeredCourses"));

    const querySnapshot = await getDocs(q);
    const registered = [];
    querySnapshot.forEach((doc) => {
      registered.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: "SET_REGISTERED_COURSES", payload: registered });
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
    fetchRegisteredCourses();
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, fetchCourses, fetchRegisteredCourses }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
