import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Alert from "../index";

test("renders danger alert and message", () => {
  const setShow = jest.fn();
  render(<Alert type="danger" message="Error occurred" setShow={setShow} />);
  expect(screen.getByText(/Error occurred/)).toBeInTheDocument();
});

test("close button calls setShow(false)", () => {
  const setShow = jest.fn();
  render(<Alert type="success" message="Done" setShow={setShow} />);
  const btn = screen.getByLabelText("Close");
  fireEvent.click(btn);
  expect(setShow).toHaveBeenCalledWith(false);
});

test("Alert smoke", () => {
  expect(true).toBe(true);
});
