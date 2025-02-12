import { Box, Typography } from "@mui/material";
import React from "react";
import { isPerson } from "../tools/isPerson";
import { PlayerData } from "../types/PlayerData";

interface PlayerDetailsProps {
  playerData: PlayerData;
}

export const PlayerDetails = ({ playerData }: PlayerDetailsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h1" sx={styles.textH1}>
        {playerData?.name}
      </Typography>

      <Typography variant="h2" sx={styles.textH2}>
        {isPerson(playerData) ? "Person" : "Starship"}
      </Typography>

      <Typography variant="body2" sx={styles.textBody}>
        {isPerson(playerData)
          ? "Mass: " + playerData?.mass
          : "Crew: " + playerData?.crew}
      </Typography>
    </Box>
  );
};

const styles = {
  textH1: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#FFD700",
  },
  textH2: {
    fontStyle: "italic",
    fontSize: { xs: "0.8rem", lg: "1rem" },
    color: "#C0C0C0",
  },
  textBody: {
    fontSize: { xs: "1rem", lg: "1.5rem" },
    marginTop: "1rem",
    color: "#FFFFFF",
  },
};
