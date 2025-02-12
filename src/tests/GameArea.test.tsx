import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { GameArea } from "../components/GameArea";

const mockStartGame = jest.fn();
const mockHandleSetGame = jest.fn();
const mockResetGame = jest.fn();
const mockResetPlayersData = jest.fn();

describe("GameArea", () => {
  it("renders Start the game and Reset the game buttons", () => {
    render(
      <GameArea
        isLoading={false}
        gameType="people"
        isDraw={false}
        startGame={mockStartGame}
        handleSetGame={mockHandleSetGame}
        resetGame={mockResetGame}
        resetPlayersData={mockResetPlayersData}
      />
    );

    expect(screen.getByText(/Start the game/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset the game/i)).toBeInTheDocument();
  });

  it("does not allow clicking the buttons when isLoading is true", () => {
    render(
      <GameArea
        isLoading={true}
        gameType="people"
        isDraw={false}
        startGame={mockStartGame}
        handleSetGame={mockHandleSetGame}
        resetGame={mockResetGame}
        resetPlayersData={mockResetPlayersData}
      />
    );

    const startButton = screen.getByText(/Start the game/i);
    const resetButton = screen.getByText(/Reset the game/i);

    expect(startButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it("renders the Draw text when isDraw is true", () => {
    render(
      <GameArea
        isLoading={false}
        gameType="people"
        isDraw={true}
        startGame={mockStartGame}
        handleSetGame={mockHandleSetGame}
        resetGame={mockResetGame}
        resetPlayersData={mockResetPlayersData}
      />
    );

    expect(screen.getByText(/Draw/i)).toBeInTheDocument();
  });

  it("calls startGame when Start the game button is clicked", () => {
    render(
      <GameArea
        isLoading={false}
        gameType="people"
        isDraw={false}
        startGame={mockStartGame}
        handleSetGame={mockHandleSetGame}
        resetGame={mockResetGame}
        resetPlayersData={mockResetPlayersData}
      />
    );

    const startButton = screen.getByText(/Start the game/i);
    fireEvent.click(startButton);

    expect(mockStartGame).toHaveBeenCalledTimes(1);
  });

  it("calls resetGame when Reset the game button is clicked", () => {
    render(
      <GameArea
        isLoading={false}
        gameType="people"
        isDraw={false}
        startGame={mockStartGame}
        handleSetGame={mockHandleSetGame}
        resetGame={mockResetGame}
        resetPlayersData={mockResetPlayersData}
      />
    );

    const resetButton = screen.getByText(/Reset the game/i);
    fireEvent.click(resetButton);

    expect(mockResetGame).toHaveBeenCalledTimes(1);
  });
});
