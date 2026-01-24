import React from "react";
import { render, screen } from "@testing-library/react";
import TextIcon from "../index";
import { ThemeProvider } from "styled-components";

test("TextIcon renders provided text inside an SVG", () => {
  render(
    <ThemeProvider value={{ primaryColor: '#123456' }}>
      <TextIcon text="Hi" />
    </ThemeProvider>
  );

  const textEl = screen.getByText("Hi");
  expect(textEl).toBeInTheDocument();

  const svg = textEl.closest('svg');
  expect(svg).not.toBeNull();
});
