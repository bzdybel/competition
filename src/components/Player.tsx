import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";
import { PlayerData } from "../types/PlayerData";
import { PlayerDetails } from "./PlayerDetails";

interface PlayerProps {
  type: "red" | "blue";
  playerData: PlayerData | undefined;
  isWinner: boolean;
  isLoading: boolean;
  scores: number;
}

export const Player: React.FC<PlayerProps> = ({
  type,
  playerData,
  isWinner,
  isLoading,
  scores,
}) => {
  const styles = getStyles(type, isWinner, isLoading);

  return (
    <Box sx={styles.box} data-testid="player-card">
      <Box sx={styles.sword} />
      <Typography sx={styles.score}>{scores}</Typography>

      <Card sx={styles.card}>
        <CardContent
          sx={{
            textAlign: "center",
            padding: 0,
            paddingBottom: "0 !important",
            height: { xs: "250px", lg: "100%" },
          }}
        >
          {isLoading || !playerData ? (
            <Skeleton
              data-testid="skeleton"
              variant="rectangular"
              height={"100%"}
              sx={styles.skeleton}
            />
          ) : (
            <PlayerDetails playerData={playerData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const getStyles = (
  type: PlayerProps["type"],
  isWinner: PlayerProps["isWinner"],
  isLoading: PlayerProps["isLoading"]
) => ({
  box: {
    order: { xs: 2, lg: "unset" },
    width: "100%",
    margin: 3,
    borderRadius: "7px 7px 2px 2px",
    height: "75%",
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    alignItems: "center",
    alignSelf: "center",
    justifyContent: {
      xs: "unset",
      lg: type === "red" ? "flex-start" : "flex-end",
    },
    gap: { xs: "unset", lg: "5rem" },
  },

  sword: {
    order: { xs: type === "blue" ? 2 : 1, lg: type === "blue" ? 3 : 1 },
    width: { xs: "50%", lg: "14px" },
    height: { xs: "14px", lg: "100%" },
    margin: 3,
    background: "#fff",
    borderRadius: "7px 7px 2px 2px",
    boxShadow:
      type === "blue"
        ? "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 115px blue, 0 0 25px blue"
        : "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 115px red, 0 0 25px red",
    zIndex: 5,
    transition: "all 1s",
  },
  card: {
    width: { xs: "50%", lg: "250px" },
    height: { xs: "auto", lg: "350px" },
    order: { xs: type === "blue" ? 1 : 2, lg: 2 },
    left: { lg: type === "red" ? "200px" : "unset" },
    right: { lg: type === "blue" ? "200px" : "unset" },
    boxShadow: isWinner
      ? "0px 0px 75px 25px rgba(142, 251, 105, 1)"
      : "0 4px 12px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    background: !isLoading ? "#2e2e2e" : "unset",
    padding: 0,
  },
  score: {
    order: type === "blue" ? 1 : 3,

    position: { xs: "unset", lg: "absolute" },
    left: { lg: type === "red" ? "500px" : "unset" },
    right: { lg: type === "blue" ? "500px" : "unset" },
    fontSize: { xs: "2rem", lg: "5rem" },
    fontWeight: "bold",
    color: "#FFF",
    opacity: 0.8,
  },
  skeleton: {
    borderRadius: "10px",
    padding: 0,
    backgroundColor: "grey.900",
    maxHeight: 400,
  },
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
});
