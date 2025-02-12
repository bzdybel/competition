import { Person } from "../types/Person";
import { PlayerData } from "../types/PlayerData";

export const isPerson = (player: PlayerData): player is Person => {
  return (player as Person)?.mass !== undefined;
};
