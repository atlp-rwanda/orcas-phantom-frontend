import React, { useEffect, useState } from "react";
import Styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import Fade from "./FadeComponent";
import EnhancedTableHead from "../../../shared/components/dashboard/EnhancedTableHead";
import EnhancedTableToolbar from "../../../shared/components/dashboard/EnhancedTableToolbar";
import TablePagination from "../../../shared/components/dashboard/TablePagination";
import { Autocomplete } from "@material-ui/lab";
import Row from "./TableRows";
import { tableData, busStops } from "shared/constants/routes/";
import { useStyles } from "./utils";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

const RouteWrapper = Styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

`;

const Routes = () => {
  // initial table state
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("routeName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [routeNameUpdate, setRouteNameUpdate] = useState();
  const [assignedBusesUpdate, setAssignedBusesUpdate] = useState();
  const [startLocUpdate, setStartLocUpdate] = useState();
  const [destLocUpdate, setDestLocUpdate] = useState();
  const [routeLengthUpdate, setRouteLengthUpdate] = useState();
  const [routeCodeUpdate, setRouteCodeUpdate] = useState();
  const [busStopsUpdate, setBusStopsUpdate] = useState([]);

  const [routeNameCreate, setRouteNameCreate] = useState();
  const [assignedBusesCreate, setAssignedBusesCreate] = useState();
  const [startLocCreate, setStartLocCreate] = useState();
  const [destLocCreate, setDestLocCreate] = useState();
  const [routeLengthCreate, setRouteLengthCreate] = useState();
  const [routeCodeCreate, setRouteCodeCreate] = useState();
  // const [busstopscre, setBusStopsUpdate] = useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const headCells = [
    {
      id: 0,
    },
    {
      id: "routeName",
      numeric: false,
      disablePadding: true,
      label: "Route Name",
    },
    {
      id: "busStopsCount",
      numeric: true,
      disablePadding: false,
      label: "No of Bus Stops",
    },
    {
      id: "assignedBuses",
      numeric: true,
      disablePadding: false,
      label: "Assigned Buses",
    },
    {
      id: "startLoc",
      numeric: true,
      disablePadding: false,
      label: "Start Location",
    },
    {
      id: "destLoc",
      numeric: true,
      disablePadding: false,
      label: "Destination Point",
    },
  ];

  const createRows = (
    routeId,
    routeName,
    busStopsCount,
    assignedBuses,
    startLoc,
    destLoc,
    routeLength,
    routeCode,
    busStops
  ) => ({
    routeId,
    routeName,
    busStopsCount,
    assignedBuses,
    startLoc,
    destLoc,
    routeLength,
    routeCode,
    busStops,
  });

  const [rows, setRows] = useState(
    tableData.map((route) =>
      createRows(
        route.id,
        route.routeName,
        route.busStopsCount,
        route.assignedBuses,
        route.startLoc,
        route.destLoc,
        route.routeLength,
        route.routeCode,
        route.busStops
      )
    )
  );

  let busStopsToDelete = rows
    .filter((row) => row.routeId === selected[0])
    .map((row) => ({ busStops: row.busStops, routeId: row.routeId }));

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const classes = useStyles();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.routeId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const deleteRow = (rowIds) => {
    console.log("these are the selected row ids", rowIds);
    setRows(rows.filter((row) => rowIds.indexOf(row.routeId)));
    setSelected([]);
    console.log(rows);
  };

  const useStylesUpdate = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
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
      minWidth: 120,
      maxWidth: 300,
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
        width: "25ch",
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const useStylesCreate = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
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
      minWidth: 120,
      maxWidth: 300,
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
        width: "25ch",
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  useEffect(() => {
    if (selected.length === 1) {
      const selectedRoute = rows.filter(
        (route) => route.routeId === selected[0]
      );

      setRouteNameUpdate(selectedRoute[0].routeName);
      setAssignedBusesUpdate(selectedRoute[0].assignedBuses);
      setStartLocUpdate(selectedRoute[0].startLoc);
      setDestLocUpdate(selectedRoute[0].destLoc);
      setRouteLengthUpdate(selectedRoute[0].routeLength);
      setRouteCodeUpdate(selectedRoute[0].routeCode);
      // setBusStopsUpdate("one");
    }
  }, [selected]);

  const [addBusStop, setAddBusStop] = useState("");

  const [addBusStp, setAddBusStp] = useState("");

  const [charCountAddBusStop, setCharCountAddBusStop] = useState(0);

  const handleChange = (Event) => {
    const { name, value } = Event.target;
    setCharCountAddBusStop(value ? value.length : 0);
    if (name === "addBusStp") {
      setAddBusStp(value);
      setAddBusStop(value);
    }
  };

  useEffect(() => {
    if (selected.length === 1) {
      const selectedRoute = rows.filter(
        (route) => route.routeId === selected[0]
      );
      selectedRoute[0].busStops.forEach((busStop) => {
        if (busStop.name === addBusStop || busStop.name === addBusStp) {
          setAddBusStp("");
          setAddBusStop("");
          setCharCountAddBusStop(0);
        }
      });
    }
  }, [addBusStop, addBusStp]);

  const classesUpdate = useStylesUpdate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addBusStopCr, setAddBusStopCr] = useState("");

  const [addBusStpCr, setAddBusStpCr] = useState("");

  const [charCntAddBusStop, setCharCntAddBusStop] = useState(0);

  const handleChangeCr = (Event) => {
    const { name, value } = Event.target;
    setCharCntAddBusStop(value ? value.length : 0);
    if (name === "addBusStpCr") {
      setAddBusStpCr(value);
      setAddBusStopCr(value);
    }
  };

  const classesCreate = useStylesCreate();

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleSave = () => {
    rows.forEach((route, index) => {
      if (route.routeId === selected[0]) {
        rows[index].routeName = routeNameUpdate;
        rows[index].routeCode = routeCodeUpdate;
        rows[index].routeLength = routeLengthUpdate;
        rows[index].assignedBuses = parseInt(assignedBusesUpdate);
        rows[index].startLoc = parseFloat(startLocUpdate);
        rows[index].destLoc = parseFloat(destLocUpdate);

        if (addBusStp) {
          rows[index].busStops = [
            ...rows[index].busStops,
            ...busStops
              .filter((busStp) => {
                if (busStp.name.indexOf(addBusStp.toString()) !== -1) {
                  return true;
                }

                return false;
              })
              .map((busStop) => ({
                id: busStop.id,
                name: busStop.name,
                lat: busStop.lat,
                long: busStop.long,
              })),
          ];
        }

        if (busStopsUpdate) {
          rows[index].busStops = rows[index].busStops.filter(
            (busStop) => !(busStopsUpdate.indexOf(busStop.name) !== -1)
          );
        }

        rows[index].busStopsCount = rows[index].busStops.length;

        setCharCountAddBusStop(0);
        setAddBusStop("");
        setAddBusStp("");
        setBusStopsUpdate([]);

        setRows(rows);

        handleClose();
      }
    });
  };

  const handleCreateRoute = () => {
    rows.forEach((route, index) => {
      if (route.routeId === selected[0]) {
        rows[index].routeName = routeNameUpdate;
        rows[index].routeCode = routeCodeUpdate;
        rows[index].routeLength = routeLengthUpdate;
        rows[index].assignedBuses = parseInt(assignedBusesUpdate);
        rows[index].startLoc = parseFloat(startLocUpdate);
        rows[index].destLoc = parseFloat(destLocUpdate);

        if (addBusStp) {
          rows[index].busStops = [
            ...rows[index].busStops,
            ...busStops
              .filter((busStp) => {
                if (busStp.name.indexOf(addBusStp.toString()) !== -1) {
                  return true;
                }

                return false;
              })
              .map((busStop) => ({
                id: busStop.id,
                name: busStop.name,
                lat: busStop.lat,
                long: busStop.long,
              })),
          ];
        }

        if (busStopsUpdate) {
          rows[index].busStops = rows[index].busStops.filter(
            (busStop) => !(busStopsUpdate.indexOf(busStop.name) !== -1)
          );
        }

        rows[index].busStopsCount = rows[index].busStops.length;

        setCharCountAddBusStop(0);
        setAddBusStop("");
        setAddBusStp("");
        setBusStopsUpdate([]);

        setRows(rows);

        handleClose();
      }
    });
  };

  return (
    <RouteWrapper>
      {open && (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classesUpdate.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classesUpdate.paper}>
              {console.log(rows.filter((row) => row.routeId === selected[0]))}
              <form className={classesUpdate.root} noValidate>
                <TextField
                  id="outlined-basic"
                  label="Route Name"
                  variant="outlined"
                  value={routeNameUpdate}
                  onChange={(e) => setRouteNameUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Route Code"
                  variant="outlined"
                  value={routeCodeUpdate}
                  onChange={(e) => setRouteCodeUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Route Length"
                  variant="outlined"
                  value={routeLengthUpdate}
                  onChange={(e) => setRouteLengthUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Assigned Buses"
                  variant="outlined"
                  value={assignedBusesUpdate}
                  onChange={(e) => setAssignedBusesUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Start Location"
                  variant="outlined"
                  value={startLocUpdate}
                  onChange={(e) => setStartLocUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Destination Point"
                  variant="outlined"
                  value={destLocUpdate}
                  onChange={(e) => setDestLocUpdate(e.target.value)}
                />

                <FormControl className={classesUpdate.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Delete a Bus Stop
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={busStopsUpdate}
                    onChange={(e) => setBusStopsUpdate(e.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {busStopsToDelete[0].busStops.map((busStop) => (
                      <MenuItem key={busStop.id} value={busStop.name}>
                        <Checkbox
                          checked={busStopsUpdate.indexOf(busStop.name) > -1}
                        />
                        <ListItemText primary={busStop.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classesUpdate.formControl}>
                  {charCountAddBusStop < 2 ? (
                    <TextField
                      id="standard-basic"
                      name="addBusStp"
                      label="Add a Bus Stop"
                      type="text"
                      style={{ width: "100%" }}
                      margin="dense"
                      inputProps={{ "data-testid": "addBusStp" }}
                      value={addBusStp}
                      onChange={handleChange}
                      autoFocus={true}
                    />
                  ) : (
                    <Autocomplete
                      type="text"
                      name="addBusStp"
                      style={{ width: "100%" }}
                      value={addBusStop}
                      onChange={(event, newValue) => {
                        setAddBusStop(newValue);
                        setCharCountAddBusStop(newValue ? newValue.length : 0);
                      }}
                      inputValue={addBusStp}
                      onInputChange={(event, newInputValue) => {
                        setAddBusStp(newInputValue);
                        setCharCountAddBusStop(
                          newInputValue ? newInputValue.length : 0
                        );
                      }}
                      freeSolo={true}
                      options={busStops.map((option) => option.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Add a Bus Stop"
                          margin="dense"
                          autoFocus={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "addBusStp",
                          }}
                        />
                      )}
                    />
                  )}
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave()}
                >
                  Save
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      )}

      {createOpen && (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classesCreate.modal}
          open={createOpen}
          onClose={handleCreateClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={createOpen}>
            <div className={classesCreate.paper}>
              <form className={classesCreate.root} noValidate>
                <TextField
                  id="outlined-basic"
                  label="Route Name"
                  variant="outlined"
                  value={routeNameCreate}
                  onChange={(e) => setRouteNameCreate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Route Code"
                  variant="outlined"
                  value={routeCodeCreate}
                  onChange={(e) => setRouteCodeCreate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Route Length"
                  variant="outlined"
                  value={routeLengthCreate}
                  onChange={(e) => setRouteLengthCreate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Assigned Buses"
                  variant="outlined"
                  value={assignedBusesCreate}
                  onChange={(e) => setAssignedBusesCreate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Start Location"
                  variant="outlined"
                  value={startLocCreate}
                  onChange={(e) => setStartLocCreate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Destination Point"
                  variant="outlined"
                  value={destLocCreate}
                  onChange={(e) => setDestLocCreate(e.target.value)}
                />

                <FormControl className={classesCreate.formControl}>
                  {charCntAddBusStop < 2 ? (
                    <TextField
                      id="standard-basic"
                      name="addBusStpCr"
                      label="Add a Bus Stop"
                      type="text"
                      style={{ width: "100%" }}
                      margin="dense"
                      inputProps={{ "data-testid": "addBusStpCr" }}
                      value={addBusStpCr}
                      onChange={handleChangeCr}
                      autoFocus={true}
                    />
                  ) : (
                    <Autocomplete
                      type="text"
                      name="addBusStpCr"
                      style={{ width: "100%" }}
                      value={addBusStopCr}
                      onChange={(event, newValue) => {
                        setAddBusStopCr(newValue);
                        setCharCntAddBusStop(newValue ? newValue.length : 0);
                      }}
                      inputValue={addBusStpCr}
                      onInputChange={(event, newInputValue) => {
                        setAddBusStpCr(newInputValue);
                        setCharCntAddBusStop(
                          newInputValue ? newInputValue.length : 0
                        );
                      }}
                      freeSolo={true}
                      options={busStops.map((option) => option.name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Add a Bus Stop"
                          margin="dense"
                          autoFocus={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "addBusStpCr",
                          }}
                        />
                      )}
                    />
                  )}
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  onClick={() => handleCreateRoute()}
                >
                  Create Route
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      )}

      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          type="route"
          tableTitle={"Routes"}
          numSelected={selected.length}
          deleteButtonTitle={"Delete Route"}
          updateButtonTitle={"Update Route"}
          createButtonTitle={"Create a Route"}
          deleteRow={deleteRow}
          selected={selected}
          updateModalOpen={open}
          setUpdateModalOpen={handleOpen}
          createModalOpen={createOpen}
          setCreateModalOpen={handleCreateOpen}
        />

        <TableContainer>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              hasEmptyCell={true}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((route) => {
                  const isItemSelected = isSelected(route.routeId);
                  const labelId = `enhanced-table-checkbox-${route.routeId}`;
                  return (
                    <Row
                      key={route.routeId}
                      route={route}
                      rowLength={route.busStops.length}
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      handleClick={handleClick}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </RouteWrapper>
  );
};

export default Routes;
