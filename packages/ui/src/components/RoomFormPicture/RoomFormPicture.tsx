import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {encode} from "blurhash";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import {CirclePicker, ColorResult} from "react-color";
import {useForm} from "react-hook-form";

import {updateRoom} from "@sentrei/common/firebase/rooms";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import User from "@sentrei/types/models/User";
import FormButtonCancel from "@sentrei/ui/components/FormButtonCancel";
import FormButtonSubmit from "@sentrei/ui/components/FormButtonSubmit";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  disabled: boolean;
  profile: Profile.Get;
  room: Room.Get;
  user: User.Get;
}

const RoomFormPicture = ({
  disabled,
  profile,
  room,
  user,
}: Props): JSX.Element => {
  const {t} = useTranslation();
  const {snackbar} = useSnackbar();

  const [color, setColor] = React.useState<string>(room.photo || "#f44336");
  const handleChange = (col: ColorResult): void => setColor(col.hex);

  const {handleSubmit} = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const encodeColorHash = (colorValue: string): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
    if (context) {
      context.fillStyle = colorValue;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.filter = "blur(3px)";
      return encode(
        context.getImageData(0, 0, canvas.width, canvas.height).data,
        canvas.width,
        canvas.height,
        3,
        3,
      );
    }
    return "";
  };

  const onSubmit = async (): Promise<void> => {
    snackbar("info", t("snackbar:snackbar.editing"));
    try {
      const hash = encodeColorHash(color);
      await updateRoom(
        {
          photo: color,
          photoHash: hash,
          updatedAt: timestamp,
          updatedBy: profile,
          updatedByUid: user.uid,
        },
        room.id,
      )?.then(() => {
        snackbar("success");
        trackEvent("Edit Room Picture");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return (
    <>
      <Box pb={3} display="flex" justifyContent="center">
        <CirclePicker color={color as string} onChangeComplete={handleChange} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormButtonSubmit disabled={disabled}>
              {t("common:common.edit")}
            </FormButtonSubmit>
          </Grid>
          <Grid item xs={12}>
            <FormButtonCancel>{t("common:common.cancel")}</FormButtonCancel>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RoomFormPicture;