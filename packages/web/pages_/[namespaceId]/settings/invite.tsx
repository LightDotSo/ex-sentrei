import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import {analytics} from "@sentrei/common/utils/firebase";
import GridSettings from "@sentrei/ui/components/GridSettings";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceInvite = dynamic(
  () => {
    return import("@sentrei/ui/components/SpaceInvite");
  },
  {ssr: false},
);

const SpaceInvitePage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceInvite");
  }, []);

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.type === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (user === undefined || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="settings" type="space" />
        <GridSettings skeleton tabSpaceKey="invite" type="space">
          <SkeletonForm />
        </GridSettings>
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="settings"
          type="space"
        />
      )}
      {user && (
        <SpaceInvite
          namespaceId={String(query.namespaceId)}
          spaceId={spaceId}
          profile={profile}
          user={user}
        />
      )}
    </>
  );
};

export default SpaceInvitePage;
