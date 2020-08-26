import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import SpacePanelBannerStyles from "./SpacePanelBannerStyles";

export interface Props {
  photo?: string | null;
  memberCount: number;
  name: string;
  // roomCount: number;
  // scoreCount: number;
}

export default function SpacePanelBanner({
  photo,
  memberCount,
  name,
}: // TODO: roomCount & scoreCount
// roomCount,
// scoreCount,
Props): JSX.Element {
  const classes = SpacePanelBannerStyles();
  const {t} = useTranslation();

  return (
    <Box p={1}>
      <Grid container alignItems="center" justify="center" direction="row">
        <Grid item xs={3}>
          {photo ? (
            <Avatar src={photo || undefined} className={classes.large} />
          ) : (
            <DashboardIcon color="disabled" className={classes.large} />
          )}
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            alignItems="center"
            justify="flex-start"
            direction="column"
            spacing={1}
          >
            <Grid item xs={12}>
              <Typography variant="h3" component="h3" align="center">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    direction="column"
                  >
                    <Typography variant="button" gutterBottom>
                      {t("common:common.members")}
                    </Typography>
                    <Typography variant="button" gutterBottom>
                      {memberCount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Divider orientation="vertical" className={classes.divider} />
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    alignItems="center"
                    justify="space-around"
                    direction="column"
                  >
                    <Typography variant="button" gutterBottom>
                      {t("common:common.rooms")}
                    </Typography>
                    <Typography variant="button" gutterBottom>
                      {memberCount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Divider orientation="vertical" className={classes.divider} />
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-start"
                    direction="column"
                  >
                    <Typography variant="button" gutterBottom>
                      {t("common:common.score")}
                    </Typography>
                    <Typography variant="button" gutterBottom>
                      {memberCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}