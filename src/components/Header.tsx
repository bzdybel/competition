import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#FFD700" }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            paddingY: 4,
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: "#000",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            STAR WARS
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
