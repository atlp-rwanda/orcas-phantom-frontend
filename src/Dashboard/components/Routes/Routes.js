import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import EnhancedTableHead from "shared/components/dashboard/EnhancedTableHead";
import EnhancedTableToolbar from "shared/components/dashboard/EnhancedTableToolbar";
import TablePagination from "shared/components/dashboard/TablePagination";
import { Autocomplete } from "@material-ui/lab";
import Row from "./TableRows";
import Fade from "./FadeComponent";
import {
  tableData,
  busStops,
  headCells,
  indexNumericSort,
  indexCharSort,
} from "shared/constants/routes/";
import {
  RouteWrapper,
  useStyles,
  useStylesCreate,
  useStylesUpdate,
} from "shared/styles/dashboard/routes/";
import { createRows, getComparator, stableSort } from "./utils";

const Routes = () => {
  // **************************************************
  // initial table state
  // **************************************************
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("routeName");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [routeNameUpdate, setRouteNameUpdate] = useState("");
  const [assignedBusesUpdate, setAssignedBusesUpdate] = useState(0);
  const [startLocUpdate, setStartLocUpdate] = useState(0);
  const [destLocUpdate, setDestLocUpdate] = useState(0);
  const [routeLengthUpdate, setRouteLengthUpdate] = useState("");
  const [routeCodeUpdate, setRouteCodeUpdate] = useState("");
  const [busStopsUpdate, setBusStopsUpdate] = useState([]);

  const [routeNameCreate, setRouteNameCreate] = useState("");
  const [assignedBusesCreate, setAssignedBusesCreate] = useState(0);
  const [startLocCreate, setStartLocCreate] = useState(0);
  const [destLocCreate, setDestLocCreate] = useState(0);
  const [routeLengthCreate, setRouteLengthCreate] = useState("");
  const [routeCodeCreate, setRouteCodeCreate] = useState("");

  //state for add bus stop in update modal
  const [addBusStop, setAddBusStop] = useState("");
  const [addBusStp, setAddBusStp] = useState("");
  const [charCountAddBusStop, setCharCountAddBusStop] = useState(0);
  // state for add bus stop in create modal
  const [addBusStopCr, setAddBusStopCr] = useState("");
  const [addBusStpCr, setAddBusStpCr] = useState("");
  const [charCntAddBusStop, setCharCntAddBusStop] = useState(0);

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

  const classes = useStyles();
  const classesUpdate = useStylesUpdate();
  const classesCreate = useStylesCreate();

  let busStopsToDelete = rows
    .filter((row) => row.routeId === selected[0])
    .map((row) => ({ busStops: row.busStops, routeId: row.routeId }));

  // ******************************************************************
  // end of initial table state
  // ******************************************************************

  // ******************************************************************
  // functions and variables for handling table actions
  // ******************************************************************

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

  // ******************************************************************
  // end of functions and variables for handling table actions
  // ******************************************************************

  // change state when a row is selected
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
    }
  }, [selected]);

  // *****************************************************
  // functions, hooks for handling auto-suggest functions
  // *****************************************************
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

  const handleChangeCr = (Event) => {
    const { name, value } = Event.target;
    setCharCntAddBusStop(value ? value.length : 0);
    if (name === "addBusStpCr") {
      setAddBusStpCr(value);
      setAddBusStopCr(value);
    }
  };

  // ***************************************************************
  // end of functions, hooks for handling auto-suggest functions
  // ***************************************************************

  // functions to handle create and update modals opening, closing, cancelling
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreateCancel = () => {
    setRouteNameCreate("");
    setRouteLengthCreate("");
    setRouteCodeCreate("");
    setAssignedBusesCreate("");
    setStartLocCreate("");
    setDestLocCreate("");
    setAddBusStopCr("");
    setAddBusStpCr("");
    setCharCntAddBusStop(0);
    setCreateOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setSelected([]);
    setOpen(false);
  };

  // function to create route
  const handleCreateRoute = () => {
    const lastId = rows[rows.length - 1].routeId;
    if (
      (routeNameCreate,
      routeCodeCreate,
      assignedBusesCreate,
      startLocCreate,
      destLocCreate)
    ) {
      if (startLocCreate === destLocCreate) {
        toast.error(
          "Route initial location and final location can't be the same",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }

      rows.push({
        routeId: lastId + 1,
        routeName: routeNameCreate,
        routeLength: routeLengthCreate,
        routeCode: routeCodeCreate,
        busStopsCount: 1,
        assignedBuses: parseFloat(assignedBusesCreate),
        startLoc: parseFloat(startLocCreate),
        destLoc: parseFloat(destLocCreate),
        busStops: [
          ...busStops
            .filter(
              (busStop) => busStop.name.indexOf(addBusStpCr.toString()) !== -1
            )
            .map((busStop) => ({
              id: busStop.id,
              name: busStop.name,
              lat: busStop.lat,
              long: busStop.long,
            })),
        ],
      });

      setRows(rows);

      setRouteNameCreate("");
      setRouteLengthCreate("");
      setRouteCodeCreate("");
      setAssignedBusesCreate("");
      setStartLocCreate("");
      setDestLocCreate("");
      setAddBusStopCr("");
      setAddBusStpCr("");
      setCharCntAddBusStop(0);

      toast.success("Route created successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      handleCreateClose();
    } else {
      toast.error("Please fill in all the fields!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // function to update route
  const handleSave = () => {
    rows.forEach((route, index) => {
      if (route.routeId === selected[0]) {
        if (startLocUpdate == destLocUpdate) {
          toast.error(
            "Route initial location and final location can't be the same",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          return;
        }

        rows[index].routeName = routeNameUpdate;
        rows[index].routeCode = routeCodeUpdate;
        rows[index].routeLength = routeLengthUpdate;
        rows[index].assignedBuses = parseInt(assignedBusesUpdate);
        rows[index].startLoc = parseFloat(startLocUpdate);
        rows[index].destLoc = parseFloat(destLocUpdate);

        // push the added bus stop to the bus stops in the route
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

        setRows(rows);

        setCharCountAddBusStop(0);
        setAddBusStop("");
        setAddBusStp("");
        setBusStopsUpdate([]);
        setSelected([]);

        toast.success("Route updated successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        handleClose();
      }
    });
  };

  // function to delete route(s)
  const deleteRow = (rowIds) => {
    setRows([...rows.filter((row) => rowIds.indexOf(row.routeId) === -1)]);
    setSelected([]);
    toast.info("Route deleted successfully", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <React.Fragment>
      <RouteWrapper data-testid="routes-wrapper">
        {/* create route modal */}
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
                    inputProps={{ "data-testid": "route-name-create" }}
                    label="Route Name"
                    variant="outlined"
                    value={routeNameCreate}
                    onChange={(e) => setRouteNameCreate(e.target.value)}
                    required={true}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "route-code-create" }}
                    label="Route Code"
                    variant="outlined"
                    value={routeCodeCreate}
                    onChange={(e) => setRouteCodeCreate(e.target.value)}
                    required={true}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "route-length-create" }}
                    label="Route Length"
                    variant="outlined"
                    value={routeLengthCreate}
                    onChange={(e) => setRouteLengthCreate(e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "assigned-buses-create" }}
                    label="Assigned Buses"
                    variant="outlined"
                    value={assignedBusesCreate}
                    onChange={(e) => setAssignedBusesCreate(e.target.value)}
                    required={true}
                    type="number"
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "start-loc-create" }}
                    label="Start Location"
                    variant="outlined"
                    value={startLocCreate}
                    onChange={(e) => setStartLocCreate(e.target.value)}
                    required={true}
                    type="number"
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "dest-loc-create" }}
                    label="Destination Point"
                    variant="outlined"
                    value={destLocCreate}
                    onChange={(e) => setDestLocCreate(e.target.value)}
                    required={true}
                    type="number"
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
                        inputProps={{ "data-testid": "add-bus-stp-cr" }}
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
                              "data-testid": "add-bus-stp-cr",
                            }}
                          />
                        )}
                      />
                    )}
                  </FormControl>

                  <br />
                  <Button
                    data-testid="cancel-create-route-btn"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    onClick={() => handleCreateCancel()}
                  >
                    Cancel
                  </Button>

                  <Button
                    data-testid="create-route-btn"
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

        {/* update route modal */}
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
                <form className={classesUpdate.root} noValidate>
                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "route-name-update" }}
                    label="Route Name"
                    variant="outlined"
                    value={routeNameUpdate}
                    onChange={(e) => setRouteNameUpdate(e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "route-code-update" }}
                    label="Route Code"
                    variant="outlined"
                    value={routeCodeUpdate}
                    onChange={(e) => setRouteCodeUpdate(e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "route-length-update" }}
                    label="Route Length"
                    variant="outlined"
                    value={routeLengthUpdate}
                    onChange={(e) => setRouteLengthUpdate(e.target.value)}
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "assigned-buses-update" }}
                    label="Assigned Buses"
                    variant="outlined"
                    value={assignedBusesUpdate}
                    onChange={(e) => setAssignedBusesUpdate(e.target.value)}
                    type="number"
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "start-loc-update" }}
                    label="Start Location"
                    variant="outlined"
                    value={startLocUpdate}
                    onChange={(e) => setStartLocUpdate(e.target.value)}
                    type="number"
                  />

                  <TextField
                    id="outlined-basic"
                    inputProps={{ "data-testid": "dest-loc-update" }}
                    label="Destination Point"
                    variant="outlined"
                    value={destLocUpdate}
                    onChange={(e) => setDestLocUpdate(e.target.value)}
                    type="number"
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
                        <MenuItem
                          data-testid="busstop-to-delete-update"
                          key={busStop.id}
                          value={busStop.name}
                        >
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
                        inputProps={{ "data-testid": "add-bus-stp" }}
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
                          setCharCountAddBusStop(
                            newValue ? newValue.length : 0
                          );
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
                              "data-testid": "add-bus-stp",
                            }}
                          />
                        )}
                      />
                    )}
                  </FormControl>

                  <br />

                  <Button
                    data-testid="cancel-update-modal-btn"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>

                  <Button
                    data-testid="update-route-btn"
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

        {/* routes table */}
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
                indexNumericSort={indexNumericSort}
                indexCharSort={indexCharSort}
              />
              <TableBody>
                {/* generate route rows from the "rows" variable */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((route, index) => {
                    const isItemSelected = isSelected(route.routeId);
                    const labelId = `enhanced-table-checkbox-${route.routeId}`;
                    return (
                      <Row
                        index={index}
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
        {/* end of routes table */}
      </RouteWrapper>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Routes;
