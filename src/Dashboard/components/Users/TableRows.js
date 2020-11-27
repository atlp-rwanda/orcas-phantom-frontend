import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

// prettier-ignore

// functions to generate user rows based on the props

const Row = (props) => {
  const {
    user,
    isItemSelected,
    labelId,
    handleClick,
    index,
  } = props;
  // used to set data-testid of "user-row" on first row
  let count = 0;

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    drop: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    busStopsWrapper: {
      background: "#fcfcfc",
    },
  });
  const classes = useRowStyles();

  return (
    <TableRow
      data-testid={
        index === 0
          ? "user-row"
          : index === 1
            ? "user-row2"
            : ++count
      }
      hover
      onClick={(event) => handleClick(event, user.userId)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={user.userId}
      selected={isItemSelected}
      className={classes.root}
    >
      <TableCell align="center" padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>

      <TableCell
        align="left"
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {user.email}
      </TableCell>
      <TableCell align="left">{user.username}</TableCell>
      <TableCell align="left">{user.role}</TableCell>
      <TableCell align="left" padding="default">{user.bus === undefined ? user.email : user.bus.bus_plate === undefined ? user.email : user.bus.bus_plate}</TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  index: PropTypes.number,
  rowLength: PropTypes.number,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bus: PropTypes.shape({
      id: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      routId: PropTypes.number.isRequired,
      bus_plate: PropTypes.string.isRequired,
      currentLocation: PropTypes.string.isRequired,
      bus_status: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Row;
