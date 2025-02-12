import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";
import { isPerson } from "../tools/isPerson";
import { PlayerData } from "../types/PlayerData";

interface PlayerProps {
  type: "red" | "blue";
  playerData: PlayerData | undefined;
  isWinner: boolean;
  isLoading: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  type,
  playerData,
  isWinner,
  isLoading,
}) => {
  const cardStyles = {
    width: 250,
    height: 350,
    position: "absolute",
    left: type === "red" ? "400px" : "unset",
    right: type === "blue" ? "400px" : "unset",
    boxShadow: isWinner
      ? "0px 0px 75px 25px rgba(142, 251, 105, 1)"
      : "0 4px 12px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    background: playerData ? "#2e2e2e" : "unset",
    padding: 0,
  };

  const boxStyles = {
    width: 300,
    height: "100vh",
    display: "flex",
    justifyContent: type === "red" ? "flex-start" : "flex-end",
    alignItems: "center",
    backgroundColor: type === "red" ? "#D22B2B" : "#0F7AAF",
    position: "relative",
    padding: 0,
  };

  return (
    <Box sx={boxStyles}>
      <Card sx={cardStyles}>
        <CardContent sx={{ textAlign: "center", padding: 0 }}>
          {isLoading || !playerData ? (
            <Skeleton
              variant="rectangular"
              width={300}
              height={350}
              sx={{ borderRadius: "10px", padding: 0, bgcolor: "grey.900" }}
            />
          ) : (
            <>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#FFD700",
                }}
              >
                {playerData.name}
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontStyle: "italic", fontSize: "1rem", color: "#C0C0C0" }}
              >
                {isPerson(playerData) ? "Person" : "Starship"}
              </Typography>

              <Typography
                variant="body2"
                sx={{ fontSize: "1rem", marginTop: 1, color: "#FFFFFF" }}
              >
                {isPerson(playerData)
                  ? "Mass: " + playerData.mass
                  : "Crew: " + playerData.crew}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
