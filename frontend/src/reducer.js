const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "SET_USERS") {
    return {
      ...state,
      users: action.payload,
    };
  }
  if (action.type === "SET_COURSES") {
    return {
      ...state,
      courses: action.payload,
    };
  }
  if (action.type === "SET_REGISTERED_COURSES") {
    return {
      ...state,
      registeredCourses: action.payload,
    };
  }
  throw new Error("No action type found");
};

export default reducer;
