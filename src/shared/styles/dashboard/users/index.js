import Styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";

// main wrapper
export const UsersWrapper = Styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  padding: 3em 1em;

  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 768px) {
    padding: 1.5em 0.5em;
  }
`;

// table styles
export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "90%",
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: "100%",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  divFetchingUsers: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    width: "100%",
    border: "1px solid red",
  },
}));

// update modal styles
export const useStylesUpdate = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #333",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// create modal styles
export const useStylesCreate = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));
