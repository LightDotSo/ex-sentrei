import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const FormPhotoStyles = makeStyles((theme: Theme) =>
  createStyles({
    cropContainer: {
      position: "relative",
      width: "100%",
      height: theme.spacing(10),
      background: "#333",
      [theme.breakpoints.up("sm")]: {
        height: theme.spacing(30),
      },
    },
  }),
);

export default FormPhotoStyles;
