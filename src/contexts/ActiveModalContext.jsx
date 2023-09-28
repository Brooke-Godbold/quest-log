import PropTypes from 'prop-types';

import { createContext, useContext, useState } from 'react';

const ActiveModalContext = createContext();

function ActiveModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ActiveModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ActiveModalContext.Provider>
  );
}

ActiveModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useActiveModal() {
  const context = useContext(ActiveModalContext);

  if (context === undefined) {
    throw new Error(
      'ActiveModalContext used outside of the ActiveModalProvider element'
    );
  }

  return context;
}

export { ActiveModalProvider, useActiveModal };
