import { Box } from "@mui/material";
import React, { useState } from "react";
import { GameArea } from "./components/GameArea";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { usePlayersData } from "./hooks/usePlayerData";
import { GameType } from "./types/GameType";

const App: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>("people");

  const { playerOne, playerTwo, isLoading, error, getPlayersData, winner } =
    usePlayersData(gameType);

  const handleSetGame = (game: GameType) => {
    setGameType(game);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Player
          isLoading={isLoading}
          type="red"
          playerData={playerOne}
          isWinner={winner === "playerOne"}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: 4,
            padding: 3,
          }}
        >
          <GameArea
            isLoading={isLoading}
            gameType={gameType}
            handleSetGame={handleSetGame}
            startGame={getPlayersData}
          />
        </Box>
        <Player
          isLoading={isLoading}
          type="blue"
          playerData={playerTwo}
          isWinner={winner === "playerTwo"}
        />
      </Box>
    </Box>
  );
};

export default App;
