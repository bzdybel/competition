import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#cbcbcb" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            Starship-People Competition
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
