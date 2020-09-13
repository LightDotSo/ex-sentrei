import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomQuit = dynamic(() => import("@sentrei/ui/components/RoomQuit"), {
  ssr: false,
});

const Quit: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.model === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (user === undefined || spaceId === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabRoomKey="settings"
          model="room"
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
        />
      </>
    );
  }

  if (!user || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          tabRoomKey="settings"
          model="room"
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
        />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <SentreiAppHeader
        notificationCount={Number(user.notificationCount)}
        profile={profile}
        namespaceId={String(query.namespaceId)}
        roomId={String(query.roomId)}
        userId={user.uid}
        tabRoomKey="settings"
        model="room"
      />
      <RoomQuit
        namespaceId={String(query.namespaceId)}
        roomId={String(query.roomId)}
        user={user}
        spaceId={spaceId}
      />
    </>
  );
};

export default Quit;
