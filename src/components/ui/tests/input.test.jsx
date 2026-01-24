import React from "react";
import { render, screen } from "@testing-library/react";
import { Input } from "../input";

it("renders Input without crashing and accepts props", () => {
  render(<Input type="text" placeholder="name" />);
  const input = screen.getByRole('textbox');
  expect(input).not.toBeNull();
  expect(input.getAttribute("type")).toBe("text");
  expect(input.getAttribute("placeholder")).toBe("name");
});
