import React from "react";
import { CircularProgress, Box, Backdrop, LinearProgress } from "@mui/material";

export const FullScreenLoader = () => (
  <Backdrop open sx={{ color: "#fff", zIndex: 1301 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export const ProgressBarLoader = () => (
  <Box width="50%">
    <LinearProgress />
  </Box>
);
