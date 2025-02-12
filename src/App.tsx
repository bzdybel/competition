import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GameArea } from "./components/GameArea";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { usePlayersData } from "./hooks/usePlayerData";
import { useResults } from "./hooks/useResults";
import { GameType } from "./types/GameType";

const App: React.FC = () => {
  const [gameType, setGameType] = useState<GameType>("people");
  const [gameStarted, setGameStarted] = useState(false);

  const {
    playerOne,
    playerTwo,
    isLoading,
    error,
    getPlayersData,
    resetPlayersData,
  } = usePlayersData(gameType);

  const { winner, scores, resetScores, calculateScores } = useResults(
    playerOne,
    playerTwo,
    gameType
  );

  useEffect(() => {
    if (gameStarted && playerOne && playerTwo) {
      calculateScores();
      setGameStarted(false);
    }
  }, [playerOne, playerTwo, gameStarted, calculateScores]);

  const handleSetGame = (game: GameType) => {
    setGameType(game);
  };

  const resetGame = () => {
    resetScores();
    resetPlayersData();
  };

  const startGame = async () => {
    await getPlayersData();
    setGameStarted(true);
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
          scores={scores.playerOne}
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            rowGap: 4,
            padding: 3,
            backgroundImage: `url('https://images.unsplash.com/photo-1696552004842-8c72b901e2a8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RhcnMlMjBibGFja3xlbnwwfHwwfHx8MA%3D%3D')`,
          }}
        >
          <GameArea
            isLoading={isLoading}
            gameType={gameType}
            handleSetGame={handleSetGame}
            startGame={startGame}
            resetGame={resetGame}
            resetPlayersData={resetPlayersData}
            isDraw={winner === "draw"}
          />
        </Box>
        <Player
          isLoading={isLoading}
          type="blue"
          playerData={playerTwo}
          isWinner={winner === "playerTwo"}
          scores={scores.playerTwo}
        />
      </Box>
    </Box>
  );
};

export default App;
