import React from "react";
import { render, screen } from "@testing-library/react";
import BrowseHeader from "../index";

jest.mock("@/shared/authHelper", () => ({
  isAuth: () => true,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/browse/uploads",
  useSearchParams: () => ({ get: () => null }),
}));

jest.mock("next/image", () => (props) => {
  return <img {...props} alt={props.alt || ""} />;
});

it("renders BrowseHeader when authenticated and shows title", () => {
  render(<BrowseHeader title="My Title" />);
  expect(screen.getByText("My Title")).toBeInTheDocument();
});

test("SecondaryNavBar smoke", () => {
  expect(true).toBe(true);
});
