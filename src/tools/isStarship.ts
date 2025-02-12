import { PlayerData } from "../types/PlayerData";
import { Starship } from "../types/Starship";

export const isStarship = (player: PlayerData): player is Starship => {
  return (player as Starship)?.crew !== undefined;
};
