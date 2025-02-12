import { useState } from "react";
import { isPerson } from "../tools/isPerson";
import { isStarship } from "../tools/isStarship";
import { GameType } from "../types/GameType";
import { Person } from "../types/Person";
import { PlayerData } from "../types/PlayerData";
import { Starship } from "../types/Starship";
import { Winner } from "../types/Winner";

const comparePeople = (playerOne: Person, playerTwo: Person): Winner => {
  const playerOneMass = parseFloat(playerOne.mass);
  const playerTwoMass = parseFloat(playerTwo.mass);

  if (playerOneMass > playerTwoMass) return "playerOne";
  if (playerTwoMass > playerOneMass) return "playerTwo";

  return "draw";
};

const compareStarships = (playerOne: Starship, playerTwo: Starship): Winner => {
  const playerOneCrew = parseInt(playerOne.crew, 10);
  const playerTwoCrew = parseInt(playerTwo.crew, 10);

  if (playerOneCrew > playerTwoCrew) return "playerOne";
  if (playerTwoCrew > playerOneCrew) return "playerTwo";
  return "draw";
};

const comparePlayers = (
  playerOne: PlayerData,
  playerTwo: PlayerData,
  gameType: GameType
): Winner | null => {
  if (playerOne === undefined || playerTwo === undefined) return null;

  if (gameType === "people" && isPerson(playerOne) && isPerson(playerTwo)) {
    return comparePeople(playerOne, playerTwo);
  }
  if (
    gameType === "starships" &&
    isStarship(playerOne) &&
    isStarship(playerTwo)
  ) {
    return compareStarships(playerOne, playerTwo);
  }

  return null;
};

const SCORE_STORAGE_KEY = "sw_game_scores";

const getStoredScores = () => {
  const savedScores = localStorage.getItem(SCORE_STORAGE_KEY);
  return savedScores ? JSON.parse(savedScores) : { playerOne: 0, playerTwo: 0 };
};

const saveScores = (scores: { playerOne: number; playerTwo: number }) => {
  localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
};

interface UseResultReturnType {
  winner: Winner | null;
  scores: { playerOne: number; playerTwo: number };
  resetScores: VoidFunction;
  calculateScores: VoidFunction;
}

export const useResults = (
  playerOne: PlayerData,
  playerTwo: PlayerData,
  gameType: GameType
): UseResultReturnType => {
  const [scores, setScores] = useState(getStoredScores());

  const calculateScores = () => {
    const winner = comparePlayers(playerOne, playerTwo, gameType);

    if (winner) {
      const updatedScores = { ...scores };

      updatedScores[winner] += 1;

      setScores(updatedScores);
      saveScores(updatedScores);
    }
  };

  const resetScores = () => {
    const reset = { playerOne: 0, playerTwo: 0 };
    setScores(reset);
    saveScores(reset);
  };

  return {
    winner: comparePlayers(playerOne, playerTwo, gameType),
    scores,
    resetScores,
    calculateScores,
  };
};
