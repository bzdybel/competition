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
      sx={{
        maxHeight: 80,
        alignSelf: "center",
        backgroundColor: "background.paper", // Light background for the group
        borderRadius: "8px",
        boxShadow: 3, // Optional: adds a subtle shadow to elevate the buttons
      }}
      disabled={disabled}
    >
      <ToggleButton
        value="people"
        sx={{
          backgroundColor: gameType === "people" ? "#f0f0f0" : "transparent", // Lighter background for active
          color: gameType === "people" ? "#333" : "#bbb", // Dark color for active, light for inactive
          "&:hover": {
            backgroundColor: "#e0e0e0", // Light hover effect
          },
        }}
      >
        People
      </ToggleButton>
      <ToggleButton
        value="starships"
        sx={{
          backgroundColor: gameType === "starships" ? "#f0f0f0" : "transparent", // Lighter background for active
          color: gameType === "starships" ? "#333" : "#bbb", // Dark color for active, light for inactive
          "&:hover": {
            backgroundColor: "#e0e0e0", // Light hover effect
          },
        }}
      >
        Starships
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
