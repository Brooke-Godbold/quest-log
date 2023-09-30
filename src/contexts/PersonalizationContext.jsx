import PropTypes from 'prop-types';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useProfilesByUsername } from '../query/profile/useProfilesByUsername';

const PersonalizationContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'personalization':
      return {
        ...state,
        personalization: action.payload.personalization,
      };
    case 'personalization/reinitialize':
      return {
        ...state,
        personalization: {},
      };
    case 'personalization/fontFamily':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          fontFamily: action.payload.fontFamily,
        },
      };
    case 'personalization/mainColor':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          mainColor: action.payload.mainColor,
        },
      };
    case 'personalization/secondaryColor':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          secondaryColor: action.payload.secondaryColor,
        },
      };
    case 'personalization/tertiaryColor':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          tertiaryColor: action.payload.tertiaryColor,
        },
      };
    case 'personalization/primaryFontColor':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          primaryFontColor: action.payload.primaryFontColor,
        },
      };
    case 'personalization/secondaryFontColor':
      return {
        ...state,
        personalization: {
          ...state.personalization,
          secondaryFontColor: action.payload.secondaryFontColor,
        },
      };
    default:
      throw new Error('Unknown Action Type');
  }
}

function PersonalizationProvider({ children }) {
  const { username } = useParams();

  const { profile } = useProfilesByUsername(username);

  const isPersonalizable = username;

  const [isPersonalizationLoaded, setIsPersonalizationLoaded] = useState(false);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [{ personalization }, dispatch] = useReducer(reducer, {});

  function updateFontFamily(fontFamily) {
    dispatch({
      type: 'personalization/fontFamily',
      payload: { fontFamily },
    });
  }

  function updateMainColor(mainColor) {
    dispatch({
      type: 'personalization/mainColor',
      payload: { mainColor },
    });
  }

  function updateSecondaryColor(secondaryColor) {
    dispatch({
      type: 'personalization/secondaryColor',
      payload: { secondaryColor },
    });
  }

  function updateTertiaryColor(tertiaryColor) {
    dispatch({
      type: 'personalization/tertiaryColor',
      payload: { tertiaryColor },
    });
  }

  function updatePrimaryFontColor(primaryFontColor) {
    dispatch({
      type: 'personalization/primaryFontColor',
      payload: { primaryFontColor },
    });
  }

  function updateSecondaryFontColor(secondaryFontColor) {
    dispatch({
      type: 'personalization/secondaryFontColor',
      payload: { secondaryFontColor },
    });
  }

  const handleResetPersonalization = useCallback(() => {
    dispatch({
      type: 'personalization',
      payload: { personalization: profile.personalization },
    });

    setIsPersonalizationLoaded(true);
  }, [profile]);

  function ReinitializePersonalization() {
    dispatch({
      type: 'personalization/reinitialize',
    });
  }

  function closePersonalization() {
    setIsPersonalizationOpen(false);

    handleResetPersonalization();
  }

  useEffect(() => {
    setIsPersonalizationOpen(false);
    setIsPersonalizationLoaded(false);

    ReinitializePersonalization();
  }, [username]);

  useEffect(() => {
    if (!profile) return;

    handleResetPersonalization();
  }, [profile, handleResetPersonalization]);

  return (
    <PersonalizationContext.Provider
      value={{
        isPersonalizationOpen,
        setIsPersonalizationOpen,
        isPersonalizationLoaded,
        closePersonalization,
        isPersonalizable,
        personalization,
        updateFontFamily,
        updateMainColor,
        updateSecondaryColor,
        updateTertiaryColor,
        updatePrimaryFontColor,
        updateSecondaryFontColor,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
}

PersonalizationProvider.propTypes = {
  children: PropTypes.node,
};

function usePersonalization() {
  const context = useContext(PersonalizationContext);

  if (context === undefined) {
    throw new Error(
      'PersonalizationContext used outside of the PersonalizationProvider element'
    );
  }

  return context;
}

export { usePersonalization, PersonalizationProvider };
