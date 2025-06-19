"use client";

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

const TextIcon = ({ text, className }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className={className}>
      <g>
        <circle
          style={{
            fill: "white",
            stroke: themeContext?.primaryColor || "#000",
            strokeWidth: 1,
            strokeMiterlimit: 10,
          }}
          cx="20"
          cy="20"
          r="20"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke={themeContext?.primaryColor || "#000"}
          fill={themeContext?.primaryColor || "#000"}
          strokeWidth="0.8px"
          dy=".3em"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

TextIcon.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default TextIcon;
