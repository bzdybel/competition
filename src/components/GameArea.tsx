import { Button } from "@mui/material";
import React from "react";
import { GameType } from "../types/GameType";
import { Toggle } from "./Toggle";

interface GameAreaProps {
  isLoading: boolean;
  gameType: GameType;
  startGame: VoidFunction;
  handleSetGame: (game: GameType) => void;
}

export const GameArea = ({
  gameType,
  startGame,
  handleSetGame,
}: GameAreaProps) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    gameType: GameType | null
  ) => {
    if (gameType !== null) {
      handleSetGame(gameType);
    }
  };

  return (
    <>
      <Toggle gameType={gameType} handleChange={handleChange} />
      <Button
        sx={{ alignSelf: "center" }}
        variant="contained"
        color="success"
        onClick={startGame}
      >
        Start the game
      </Button>
    </>
  );
};
