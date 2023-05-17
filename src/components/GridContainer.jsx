import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 15,
    color: "blue",
    fontWeight: 600,
    marginBottom: -30,
  },
  grid: {
    border: 1,
    borderRadius: 3,
    boxShadow: `0 1px 5px 1px var(--color-border)`,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  headerButton: {
    marginBottom: -15,
  },
  headerTitle: {
    fontSize: 15,
    color: "blue",
    fontWeight: 600,
  },
}));
export default function GridContainer({
  children,
  title,
  headerButton,
  ...otherProps
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.grid}
      justifyContent="center"
      alignItems="center"
      {...otherProps}
    >
      {title && headerButton ? (
        <>
          <Grid item xs={12} className={classes.headerButton}>
            <div className="row">
              <Typography variant="h2" className={classes.headerTitle}>
                {title}
              </Typography>
              {headerButton}
            </div>
          </Grid>
        </>
      ) : (
        title && (
          <Grid item xs={12}>
            <Typography variant="h2" className={classes.title}>
              {title}
            </Typography>
          </Grid>
        )
      )}
      {children}
    </Grid>
  );
}
