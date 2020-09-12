import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import * as React from "react";

import PaperCupsWindow from "@sentrei/ui/components/PaperCupsWindow";

import SupportScreenStyles from "./SupportScreenStyles";

export interface Props {
  email?: string | null;
  name?: string | null;
  userId?: string | null;
}

export default function SupportScreen({
  email,
  name,
  userId,
}: Props): JSX.Element {
  const classes = SupportScreenStyles();

  return (
    <>
      <Box py={3} />
      <Container maxWidth="md" className={classes.window}>
        <PaperCupsWindow
          customerEmail={email || ""}
          customerName={name || ""}
          customerUid={userId || ""}
        />
      </Container>
      <Box py={3} />
    </>
  );
}