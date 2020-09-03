import Box from "@material-ui/core/Box";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getInvitesLive} from "@sentrei/common/firebase/invites";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import GridSettings from "@sentrei/ui/components/GridSettings";
import InviteFormEmail from "@sentrei/ui/components/InviteFormEmail";
import InviteFormLink from "@sentrei/ui/components/InviteFormLink";
import InviteFormUsername from "@sentrei/ui/components/InviteFormUsername";
import InviteList from "@sentrei/ui/components/InviteList";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  namespaceId: string;
  spaceId: string;
  user: User.Get;
}

export default function SpaceInvite({
  profile,
  user,
  namespaceId,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [invites, setInvites] = React.useState<
    Invite.Get[] | null | undefined
  >();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getInvitesLive(spaceId, snap => {
      setInvites(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="invite" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings namespaceId={namespaceId} tabSpaceKey="invite" type="space">
      <FormSection icon={<SettingsIcon />} title={t("common:common.invite")} />
      <TabBoard
        size="sm"
        tabIconOne={<EmailIcon />}
        tabIconTwo={<LinkIcon />}
        tabIconThree={<AssignmentIndIcon />}
        tabLabelOne={t("common:common.email")}
        tabLabelTwo={t("common:common.link")}
        tabLabelThree={t("common:common.username")}
        tabPanelOne={
          <>
            <InviteFormEmail profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="email" />}
          </>
        }
        tabPanelTwo={
          <>
            <InviteFormLink profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="link" />}
          </>
        }
        tabPanelThree={
          <InviteFormUsername profile={profile} user={user} spaceId={spaceId} />
        }
      />
    </GridSettings>
  );
}
