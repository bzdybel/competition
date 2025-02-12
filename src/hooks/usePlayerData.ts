import { useMutation } from "react-query";
import { fetchPerson, fetchStarship } from "../api/swapi";

import { GameType } from "../types/GameType";
import { PlayerData } from "../types/PlayerData";

type UsePlayersDataType = {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  isLoading: boolean;
  error: unknown;
  getPlayersData: () => Promise<void>;
  resetPlayersData: VoidFunction;
};

export const usePlayersData = (gameType: GameType): UsePlayersDataType => {
  const playerOneId = Math.floor(Math.random() * 10) + 1;
  let playerTwoId = Math.floor(Math.random() * 10) + 1;

  while (playerTwoId === playerOneId) {
    playerTwoId = Math.floor(Math.random() * 10) + 1;
  }

  const fetchData = async (id: number): Promise<PlayerData> => {
    try {
      if (gameType === "people") {
        return await fetchPerson(id);
      }
      return await fetchStarship(id);
    } catch (error) {
      console.error(`Error fetching data for ID: ${id}.`, error);

      const newId = Math.floor(Math.random() * 10) + 1;

      return fetchData(newId);
    }
  };

  const {
    data: playerOne,
    isLoading: isLoadingPlayerOne,
    error: errorPlayerOne,
    mutateAsync: refetchPlayerOne,
    reset: resetPlayerOne,
  } = useMutation<PlayerData>(["sw-data-p1", gameType, playerOneId], () =>
    fetchData(playerOneId)
  );

  const {
    data: playerTwo,
    isLoading: isLoadingPlayerTwo,
    error: errorPlayerTwo,
    mutateAsync: refetchPlayerTwo,
    reset: resetPlayerTwo,
  } = useMutation<PlayerData>(["sw-data-p2", gameType, playerTwoId], () =>
    fetchData(playerTwoId)
  );

  const getPlayersData = async () => {
    await refetchPlayerOne();
    await refetchPlayerTwo();
  };

  const resetPlayersData = () => {
    resetPlayerOne();
    resetPlayerTwo();
  };
  return {
    playerOne,
    playerTwo,
    isLoading: isLoadingPlayerOne || isLoadingPlayerTwo,
    error: errorPlayerOne || errorPlayerTwo,
    getPlayersData,
    resetPlayersData,
  };
};
