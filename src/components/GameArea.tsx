import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { GameType } from "../types/GameType";
import { Toggle } from "./Toggle";

interface GameAreaProps {
  isLoading: boolean;
  gameType: GameType;
  isDraw: boolean;
  startGame: VoidFunction;
  handleSetGame: (game: GameType) => void;
  resetGame: VoidFunction;
  resetPlayersData: VoidFunction;
}

export const GameArea = ({
  gameType,
  isLoading,
  isDraw,
  startGame,
  handleSetGame,
  resetGame,
  resetPlayersData,
}: GameAreaProps) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    gameType: GameType | null
  ) => {
    if (gameType !== null) {
      handleSetGame(gameType);
      resetPlayersData();
    }
  };

  return (
    <>
      <Toggle
        disabled={isLoading}
        gameType={gameType}
        handleChange={handleChange}
      />
      <Box sx={styles.container}>
        <Box sx={styles.buttonContainer}>
          <Button
            sx={styles.button}
            variant="contained"
            color="success"
            onClick={startGame}
            disabled={isLoading}
          >
            Start the game
          </Button>
          <Button
            sx={styles.button}
            variant="contained"
            color="secondary"
            onClick={resetGame}
            disabled={isLoading}
          >
            Reset the game
          </Button>
        </Box>
        {isDraw && (
          <Typography color="warning" sx={styles.drawText} variant="h1">
            Draw
          </Typography>
        )}
      </Box>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
  },
  button: {
    alignSelf: "center",
    whiteSpace: "nowrap",
  },
  drawText: {
    fontWeight: "bold",
    fontSize: "trem",
    textTransform: "uppercase",
    opacity: 0.8,
    marginTop: 10,
  },
};
