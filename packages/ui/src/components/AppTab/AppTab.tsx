import Container from "@material-ui/core/Container";
import {withStyles, Theme, createStyles} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Link from "next-translate/Link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {AppTabKey} from "@sentrei/types/models/AppTab";

import AppTabStyles from "./AppTabStyles";

interface Props {
  spaceId: string;
  // eslint-disable-next-line react/require-default-props
  tabKey?: AppTabKey;
}

interface StyledTabProps {
  label: string;
}

const TabMap = {
  dashboard: 0,
  rooms: 1,
  activity: 2,
  analytics: 3,
  leaderboard: 4,
  members: 5,
  settings: 6,
};

const AntTabs = withStyles((theme: Theme) =>
  createStyles({
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
)(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      marginRight: theme.spacing(1),
      "&:hover": {
        color: theme.palette.primary.main,
        opacity: 1,
      },
      "&$selected": {
        color: theme.palette.primary.main,
      },
      "&:focus": {
        color: theme.palette.primary.main,
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab {...props} />);

export default function AppTab({
  spaceId,
  tabKey = "dashboard",
}: Props): JSX.Element {
  const classes = AppTabStyles();
  const {t} = useTranslation();

  const [value] = React.useState(TabMap[tabKey]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <AntTabs value={value} aria-label="appTab">
          <Link href="/[spaceId]" as={`/${spaceId}`}>
            <AntTab label={t("common:common.dashboard")} />
          </Link>
          <Link href="/[spaceId]" as={`/${spaceId}`}>
            <AntTab label={t("common:common.rooms")} />
          </Link>
          <Link href="/[spaceId]/activity" as={`/${spaceId}/activity`}>
            <AntTab label={t("common:common.activity")} />
          </Link>
          <Link href="/[spaceId]/analytics" as={`/${spaceId}/analytics`}>
            <AntTab label={t("common:common.analytics")} />
          </Link>
          <Link href="/[spaceId]/leaderboard" as={`/${spaceId}/leaderboard`}>
            <AntTab label={t("common:common.leaderboard")} />
          </Link>
          <Link href="/[spaceId]/members" as={`/${spaceId}/members`}>
            <AntTab label={t("common:common.members")} />
          </Link>
          <Link href="/[spaceId]/settings" as={`/${spaceId}/settings`}>
            <AntTab label={t("common:common.settings")} />
          </Link>
        </AntTabs>
      </Container>
    </div>
  );
}