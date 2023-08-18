import PropTypes from "prop-types";

import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  userId: null,
  isAuthorized: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/user":
      return {
        ...state,
        userId: action.payload.userId,
        isAuthorized: action.payload.isAuthorized,
      };
    case "auth/error": {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    case "auth/logout":
      return initialState;
    default:
      throw new Error("Unknown Action Type");
  }
}

function AuthProvider({ children }) {
  const [{ userId, isAuthorized }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function getAuthorization() {
    //if success
    dispatch({ payload: { userId: null, isAuthorized: false } });
    //if error
    dispatch({ payload: { error: "error" } });
  }

  return (
    <AuthContext.Provider value={{ userId, isAuthorized, getAuthorization }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext used outside of the AuthProvider element");
  }

  return context;
}

export { AuthProvider, useAuth };
