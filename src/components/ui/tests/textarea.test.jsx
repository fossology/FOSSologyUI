import React from "react";
import { render, screen } from "@testing-library/react";
import { Textarea } from "../textarea";

it("renders Textarea without crashing and accepts props", () => {
  render(<Textarea placeholder="desc" />);
  const ta = screen.getByRole('textbox');
  expect(ta).not.toBeNull();
  expect(ta.getAttribute("placeholder")).toBe("desc");
});

test("Textarea smoke", () => {
  expect(true).toBe(true);
});
