import PropTypes from "prop-types";

import { createContext, useContext, useReducer } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const LocationsContext = createContext();

const initialState = {
  previousLocation: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "location/previous":
      return {
        ...state,
        previousLocation: action.payload.previousLocation,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

function LocationsProvider({ children }) {
  const [{ previousLocation }, dispatch] = useReducer(reducer, initialState);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  function setPreviousLocation() {
    dispatch({
      type: "location/previous",
      payload: {
        previousLocation: `${location.pathname}?view=${searchParams.get(
          "view"
        )}${searchParams.get("game") && `&game=${searchParams.get("game")}`}`,
      },
    });
  }

  return (
    <LocationsContext.Provider
      value={{
        previousLocation,
        setPreviousLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

LocationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLocations() {
  const context = useContext(LocationsContext);

  if (context === undefined) {
    throw new Error(
      "LocationsContext used outside of the LocationsProvider element"
    );
  }

  return context;
}

export { LocationsProvider, useLocations };
