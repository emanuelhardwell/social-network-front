import { Grid } from "@mui/material";
import React from "react";
import { LoadingRoller } from "../loaders/LoadingRoller";

export const PostLoading = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <LoadingRoller />
        </Grid>
      </Grid>
    </>
  );
};
