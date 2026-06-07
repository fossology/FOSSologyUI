import React from "react"; // add React import for JSX
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../index";

test("Button renders children text and responds to click", () => {
  const handleClick = jest.fn();
  render(<Button type="button" onClick={handleClick}>Click me</Button>);

  const btn = screen.getByText("Click me");
  expect(btn).toBeInTheDocument();

  fireEvent.click(btn);
  expect(handleClick).toHaveBeenCalled();
});
