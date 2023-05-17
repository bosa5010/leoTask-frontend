import React from "react";
import { Container, Grid } from "../../node_modules/@material-ui/core/index";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export const ActionStatus = ({ loading, error, success, message }) => {
  return (
    <Container maxWidth="lg">
      {loading && (
        <Grid item xs={12}>
          <LoadingBox></LoadingBox>
        </Grid>
      )}
      {error && (
        <Grid item xs={12}>
          <MessageBox variant="danger">{error}</MessageBox>
        </Grid>
      )}
      {success && (
        <Grid item xs={12}>
          <MessageBox variant="success">{message}</MessageBox>
        </Grid>
      )}
    </Container>
  );
};
