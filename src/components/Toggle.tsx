import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { GameType } from "../types/GameType";

interface ToggleProps {
  gameType: GameType;
  handleChange: (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: GameType | null
  ) => void;
}

export const Toggle = ({ gameType, handleChange }: ToggleProps) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={gameType}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ maxHeight: 80, alignSelf: "center" }}
    >
      <ToggleButton value="people">People</ToggleButton>
      <ToggleButton value="starships">Starships</ToggleButton>
    </ToggleButtonGroup>
  );
};
