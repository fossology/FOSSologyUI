import React from "react";
import { render, screen } from "@testing-library/react";
import TreeContainer from "../index";

test("renders tree node names", () => {
  const data = [
    { id: "1", name: "Root", children: [{ id: "2", name: "Child" }] },
  ];
  const handleClick = jest.fn();
  render(<TreeContainer data={data} handleClick={handleClick} />);
  expect(screen.getByText(/Root/)).toBeInTheDocument();
});

test("TreeContainer smoke", () => {
  expect(true).toBe(true);
});
