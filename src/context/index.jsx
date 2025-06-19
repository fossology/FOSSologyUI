"use client"; // Ensure client context

import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

// Helper functions to persist theme
import { setLocalStorage, getLocalStorage } from "@/shared/storageHelper";

// Initial state
const initialState = {
  theme: getLocalStorage("theme") || "light",
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setTheme = (theme) => {
    setState({ theme });
    setLocalStorage("theme", theme);
  };

  return (
    <GlobalContext.Provider value={{ state, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
