import { Grid, Typography } from "@mui/material";
import React from "react";

export const PostNotFound = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography textAlign="center" gutterBottom>
            No hay publicaciones
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
