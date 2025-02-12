import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.box}>
          <Typography variant="h3" component="div" sx={styles.typography}>
            STAR WARS
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: {
    bgcolor: "#FFD700",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  box: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    paddingY: 4,
  },
  typography: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 4,
  },
};
