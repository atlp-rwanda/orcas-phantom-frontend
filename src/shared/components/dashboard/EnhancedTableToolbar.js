import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PropTypes from "prop-types";

// prettier-ignore

const EnhancedTableToolbar = (props) => {
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight: {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
      flex: "1 1 100%",
    },
  }));
  const classes = useToolbarStyles();
  const {
    numSelected,
    type,
    tableTitle,
    deleteButtonTitle,
    deleteRow,
    selected,
    updateModalOpen,
    setUpdateModalOpen,
    updateButtonTitle,
    createButtonTitle,
    createModalOpen,
    setCreateModalOpen

  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {type}
          {numSelected > 1 && ((type === "route" && "s") || (type === "bus" && "es") || (type === "user" && "s") || (type === "bus stop" && "s"))} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <Tooltip title={deleteButtonTitle}>
            <IconButton
              onClick={() => deleteRow(selected)}
              aria-label="delete"
              data-testid="delete-btn"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {numSelected === 1 && (
            <Tooltip title={updateButtonTitle}>
              <IconButton
                onClick={() => setUpdateModalOpen(!updateModalOpen)}
                aria-label="update"
                data-testid="open-update-modal"
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}
        </React.Fragment>
      ) : (
        <Tooltip title={createButtonTitle}>
          <IconButton
            onClick={() => setCreateModalOpen(!createModalOpen)}
            aria-label="add"
            data-testid="open-create-modal"
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  type: PropTypes.string.isRequired,
  deleteButtonTitle: PropTypes.string.isRequired,
  updateButtonTitle: PropTypes.string.isRequired,
  createButtonTitle: PropTypes.string.isRequired,
  tableTitle: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  updateModalOpen: PropTypes.bool.isRequired,
  setUpdateModalOpen: PropTypes.func.isRequired,
  createModalOpen: PropTypes.bool.isRequired,
  setCreateModalOpen: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
