import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import DarkModeButton from "@sentrei/ui/components/DarkModeButton";
import IntlForm from "@sentrei/ui/components/IntlForm";
import MuiMenuItem from "@sentrei/ui/components/MuiMenuItem";

export interface Props {
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

export default function HeaderMobileDialog({
  anchorEl,
  open,
  onClose,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="mobile-menu"
      keepMounted
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MuiMenuItem href="/about">
        <ListItemIcon>
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:default.about")} />
      </MuiMenuItem>
      <MuiMenuItem href="/home">
        <ListItemIcon>
          <Badge color="secondary">
            <HomeIcon fontSize="small" />
          </Badge>
        </ListItemIcon>
        <ListItemText primary={t("header:default.home")} />
      </MuiMenuItem>
      <MuiMenuItem href="/pricing">
        <ListItemIcon>
          <LocalOfferIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:default.pricing")} />
      </MuiMenuItem>
      <Divider />
      <MuiMenuItem href="/support">
        <ListItemIcon>
          <AccessibilityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t("header:default.support")} />
      </MuiMenuItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.mode")} />
      </MenuItem>
      <ListItem>
        <IconButton>
          <DarkModeButton />
        </IconButton>
      </ListItem>
      <Divider />
      <MenuItem disabled>
        <ListItemText primary={t("common:common.language")} />
      </MenuItem>
      <ListItem>
        <IntlForm />
      </ListItem>
    </Menu>
  );
}
