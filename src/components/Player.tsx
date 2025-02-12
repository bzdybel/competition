import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";
import { isPerson } from "../tools/isPerson";
import { PlayerData } from "../types/PlayerData";

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
  const styles = {
    box: {
      right: type === "blue" ? "20px" : "unset",
      left: type === "red" ? "20px" : "unset",
      top: "25%",
      width: "14px",
      background: "#fff",
      height: "720px",
      borderRadius: "7px 7px 2px 2px",
      boxShadow:
        type === "blue"
          ? "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 115px blue, 0 0 25px blue"
          : "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 115px red, 0 0 25px red",
      zIndex: 5,
      transition: " all 1s",
      display: "flex",
      alignItems: "center",
      justifyContent: type === "red" ? "flex-start" : "flex-end",
      position: "absolute",
      padding: 0,
    },
    card: {
      width: "250px",
      height: "350px",
      position: "absolute",
      left: type === "red" ? "400px" : "unset",
      right: type === "blue" ? "400px" : "unset",
      boxShadow: isWinner
        ? "0px 0px 75px 25px rgba(142, 251, 105, 1)"
        : "0 4px 12px rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
      background: !isLoading ? "#2e2e2e" : "unset",
      padding: 0,
    },
    score: {
      position: "absolute",
      top: "50%",
      left: type === "red" ? "100px" : "unset",
      right: type === "blue" ? "100px" : "unset",
      transform: "translate(-50%, -50%)",
      fontSize: "5rem",
      fontWeight: "bold",
      color: "#FFF",
      opacity: 0.8,
    },
    skeleton: {
      borderRadius: "10px",
      padding: 0,
      backgroundColor: "grey.900",
    },
    textH1: {
      fontWeight: "bold",
      fontSize: "2rem",
      color: "#FFD700",
    },
    textH2: {
      fontStyle: "italic",
      fontSize: "1rem",
      color: "#C0C0C0",
    },
    textBody: {
      fontSize: "1.5rem",
      marginTop: "1rem",
      color: "#FFFFFF",
    },
  };

  return (
    <Box sx={styles.box}>
      <Typography sx={styles.score}>{scores}</Typography>

      <Card sx={styles.card}>
        <CardContent sx={{ textAlign: "center", padding: 0, height: "100%" }}>
          {isLoading || !playerData ? (
            <Skeleton
              variant="rectangular"
              width={250}
              height={350}
              sx={styles.skeleton}
            />
          ) : (
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
