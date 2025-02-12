import { useMutation } from "react-query";
import { fetchPerson, fetchStarship } from "../api/swapi";

import { GameType } from "../types/GameType";
import { PlayerData } from "../types/PlayerData";

type UsePlayersDataType = {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  isLoading: boolean;
  error: unknown;
  getPlayersData: VoidFunction;
};

export const usePlayersData = (gameType: GameType): UsePlayersDataType => {
  const playerOneId = Math.floor(Math.random() * 10) + 1;
  let playerTwoId = Math.floor(Math.random() * 10) + 1;

  while (playerTwoId === playerOneId) {
    playerTwoId = Math.floor(Math.random() * 10) + 1;
  }

  const fetchData = (id: number) => {
    return gameType === "people" ? fetchPerson(id) : fetchStarship(id);
  };

  const {
    data: playerOne,
    isLoading: isLoadingPlayerOne,
    error: errorPlayerOne,
    mutateAsync: refetchPlayerOne,
  } = useMutation<PlayerData>(["sw-data-p1", gameType, playerOneId], () =>
    fetchData(playerOneId)
  );

  const {
    data: playerTwo,
    isLoading: isLoadingPlayerTwo,
    error: errorPlayerTwo,
    mutateAsync: refetchPlayerTwo,
  } = useMutation<PlayerData>(["sw-data-p2", gameType, playerTwoId], () =>
    fetchData(playerTwoId)
  );

  const getPlayersData = async () => {
    await refetchPlayerOne();
    await refetchPlayerTwo();
  };

  return {
    playerOne,
    playerTwo,
    isLoading: isLoadingPlayerOne || isLoadingPlayerTwo,
    error: errorPlayerOne || errorPlayerTwo,
    getPlayersData,
  };
};
