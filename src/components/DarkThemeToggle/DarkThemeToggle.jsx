/* eslint-disable jsx-a11y/label-has-associated-control */
import "./DarkThemeToggle.css";

// Global Context for theme
import { GlobalContext } from "context";
import React, { useContext } from "react";
import { BrightnessHighFill, MoonStarsFill } from "react-bootstrap-icons";

const DarkThemeToggle = () => {
  const { state, setTheme } = useContext(GlobalContext);

  const handleTheme = () => {
    setTheme(`${state.theme === "light" ? "dark" : "light"}`);
  };

  return (
    <div className="toggle-button--container">
      <input
        type="checkbox"
        className="toggle-button--checkbox"
        value={state.theme}
        id="checkbox"
        onChange={() => handleTheme()}
      />
      <label
        htmlFor="checkbox"
        className={`${state.theme} toggle-button--label`}
      >
        {state.theme !== "light" ? (
          <MoonStarsFill className="toggle-button--moon" size={20} />
        ) : (
          <BrightnessHighFill className="toggle-button--sun" size={22} />
        )}
      </label>
    </div>
  );
};

export default DarkThemeToggle;
