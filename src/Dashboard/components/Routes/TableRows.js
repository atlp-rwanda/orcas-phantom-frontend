import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

function Row(props) {
  const { route, isItemSelected, labelId, handleClick, rowLength } = props;
  const [open, setOpen] = React.useState(false);

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
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, route.routeId)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={route.routeId}
        selected={isItemSelected}
        className={classes.root}
      >
        <TableCell align="center" padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell
          align="left"
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {route.routeName}
        </TableCell>
        <TableCell align="center">{route.busStopsCount}</TableCell>
        <TableCell align="center">{route.assignedBuses}</TableCell>
        <TableCell align="center" padding="default">
          {route.startLoc}
        </TableCell>
        <TableCell align="center">{route.destLoc}</TableCell>
      </TableRow>

      <TableRow className={classes.busStopsWrapper}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Bus Stops Included
              </Typography>
              <Table size="small" aria-label="bus-stops">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Lat</TableCell>
                    <TableCell align="center">Long</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {route.busStops.map((busStop, index) => (
                    <TableRow
                      className={index === rowLength - 1 ? classes.drop : ""}
                      key={busStop.id}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {busStop.id}
                      </TableCell>
                      <TableCell>{busStop.name}</TableCell>
                      <TableCell align="center">{busStop.lat}</TableCell>
                      <TableCell align="center">{busStop.long}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  rowLength: PropTypes.number,
  route: PropTypes.shape({
    routeId: PropTypes.number.isRequired,
    routeName: PropTypes.string.isRequired,
    busStopsCount: PropTypes.number.isRequired,
    assignedBuses: PropTypes.number.isRequired,
    startLoc: PropTypes.number.isRequired,
    destLoc: PropTypes.number.isRequired,
    busStops: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Row;
