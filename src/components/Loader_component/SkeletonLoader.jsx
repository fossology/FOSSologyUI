import React from "react";
import { Skeleton, Box } from "@mui/material";

const SkeletonLoader = () => (
  <Box>
    <Skeleton variant="text" width={200} height={30} />
    <Skeleton variant="rectangular" width={300} height={150} />
  </Box>
);

export default SkeletonLoader;
