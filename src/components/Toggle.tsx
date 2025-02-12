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
      sx={styles.toggleButtonGroup}
      disabled={disabled}
    >
      <ToggleButton
        value="people"
        sx={{
          backgroundColor: gameType === "people" ? "#f0f0f0" : "transparent",
          color: gameType === "people" ? "#333" : "#bbb",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        People
      </ToggleButton>
      <ToggleButton
        value="starships"
        sx={{
          backgroundColor: gameType === "starships" ? "#f0f0f0" : "transparent",
          color: gameType === "starships" ? "#333" : "#bbb",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        Starships
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
// Style objects
const styles = {
  toggleButtonGroup: {
    maxHeight: 80,
    alignSelf: "center",
    backgroundColor: "background.paper",
    borderRadius: "8px",
    boxShadow: 3,
  },
};
