import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@mui/material";
import React from "react";
import { GameType } from "../types/GameType";

interface ToggleProps extends ToggleButtonGroupProps {
  gameType: GameType;
  handleChange: (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: GameType | null
  ) => void;
}

export const Toggle = ({ gameType, disabled, handleChange }: ToggleProps) => {
  return (
    <ToggleButtonGroup
      value={gameType}
      exclusive
      onChange={handleChange}
      aria-label="Game Type"
      color="error"
      sx={styles.toggleButtonGroup}
      disabled={disabled}
    >
      <ToggleButton value="people">People</ToggleButton>
      <ToggleButton value="starships">Starships</ToggleButton>
    </ToggleButtonGroup>
  );
};
const styles = {
  toggleButtonGroup: {
    maxHeight: 80,
    alignSelf: "center",
    backgroundColor: "background.paper",
    borderRadius: "8px",
    boxShadow: 3,
  },
};
