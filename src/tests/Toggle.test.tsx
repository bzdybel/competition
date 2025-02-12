import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Toggle } from "../components/Toggle";

describe("Toggle Component", () => {
  const mockHandleChange = jest.fn();

  it("renders the Toggle component", () => {
    render(
      <Toggle
        gameType="people"
        handleChange={mockHandleChange}
        disabled={false}
      />
    );

    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByText("Starships")).toBeInTheDocument();
  });

  it("calls handleChange when a button is clicked", () => {
    render(
      <Toggle
        gameType="people"
        handleChange={mockHandleChange}
        disabled={false}
      />
    );

    const starshipsButton = screen.getByText("Starships");

    fireEvent.click(starshipsButton);

    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.anything(),
      "starships"
    );
  });

  it("disables buttons when disabled prop is true", () => {
    render(
      <Toggle
        gameType="people"
        handleChange={mockHandleChange}
        disabled={true}
      />
    );

    expect(screen.getByText("People")).toBeDisabled();
    expect(screen.getByText("Starships")).toBeDisabled();
  });
});
