import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getAdminMembers} from "@sentrei/common/firebaseAdmin/members";
import {getAdminNamespace} from "@sentrei/common/firebaseAdmin/namespaces";
import {analytics} from "@sentrei/common/utils/firebase";
import Member from "@sentrei/types/models/Member";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceMember from "@sentrei/ui/components/SpaceMember";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

export interface Props {
  spaceId: string | null;
  membersData: string | null;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "unstable_blocking"};
};

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const namespaceId = String(params?.namespaceId);
  const namespace = await getAdminNamespace(namespaceId);
  if (!namespace || namespace.type === "user") {
    return {
      props: {
        spaceId: null,
        membersData: null,
      },
    };
  }
  const membersReq = getAdminMembers({
    spaceId: namespace.uid,
  });
  const [membersData] = await Promise.all([membersReq]);
  return {
    props: {
      spaceId: JSON.stringify(namespace.uid),
      membersData: JSON.stringify(membersData),
    },
    revalidate: 1,
  };
};

const MembersPage = ({
  spaceId,
  membersData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("spaceMembers");
  }, []);

  if (!user && typeof window !== "undefined") {
    Router.pushI18n("/");
  }

  if (user === undefined || !profile || !spaceId || !membersData) {
    return (
      <>
        <SentreiAppHeader skeleton tabSpaceKey="members" type="space" />
        <SkeletonForm />
      </>
    );
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          namespaceId={String(query.namespaceId)}
          tabSpaceKey="members"
          type="space"
        />
      )}
      {user && (
        <SpaceMember
          spaceId={JSON.parse(spaceId) as string}
          membersData={JSON.parse(membersData) as Member.Get[]}
          userId={user.uid}
        />
      )}
    </>
  );
};

export default MembersPage;