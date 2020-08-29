import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import Loader from "@sentrei/ui/components/Loader";
import SpaceAnalytics from "@sentrei/ui/components/SpaceAnalytics";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const AnalyticsPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceAnalytics");
  }, []);

  if (user === undefined) {
    return <Loader />;
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile ? (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
          tabKey="analytics"
        />
      ) : (
        <SentreiAppHeader spaceId={String(query.spaceId)} />
      )}
      <SpaceAnalytics spaceId={String(query.spaceId)} />
    </>
  );
};

export default AnalyticsPage;