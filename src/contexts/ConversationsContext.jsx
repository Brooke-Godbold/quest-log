import PropTypes from "prop-types";

import { createContext, useContext, useReducer } from "react";

const ConversationsContext = createContext();

const initialState = {
  currentConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "messages/current":
      return {
        ...state,
        currentConversation: action.payload.currentConversation,
      };
    default:
      throw new Error("Unknown Action Type");
  }
}

function ConversationsProvider({ children }) {
  const [{ currentConversation }, dispatch] = useReducer(reducer, initialState);

  function setCurrentConversation(userId) {
    dispatch({
      type: "messages/current",
      payload: { currentConversation: userId },
    });
  }

  function setInitialConversation(userId) {
    if (!currentConversation) {
      dispatch({
        type: "messages/current",
        payload: { currentConversation: userId },
      });
    }
  }

  return (
    <ConversationsContext.Provider
      value={{
        currentConversation,
        setCurrentConversation,
        setInitialConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

ConversationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useConversations() {
  const context = useContext(ConversationsContext);

  if (context === undefined) {
    throw new Error(
      "ConversationsContext used outside of the ConversationsProvider element"
    );
  }

  return context;
}

export { ConversationsProvider, useConversations };
