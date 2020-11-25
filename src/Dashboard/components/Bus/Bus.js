import React from "react";

import { useState, useEffect } from "react";

// import Header from "shared/styles/dashboard/generalStyles";
// import Nav from "./nav"

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import EnhancedTableHead from "shared/components/dashboard/EnhancedTableHead";
import EnhancedTableToolbar from "shared/components/dashboard/EnhancedTableToolbar";
import TablePagination from "shared/components/dashboard/TablePagination";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Autocomplete } from "@material-ui/lab";
import Fade from "./FadeComponent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

const SampleRoute = [
  {
    id: 12,
    routeName: "Kacyiru - Kimironko",
    routeLength: "5km",
    routeCode: "REM - DOWN",
    busStopsCount: 13,
    assignedBuses: 10,
    startLoc: 6.0,
    destLoc: 24,
    busStops: [
      { id: 1, name: "City Plaza", lat: -1, long: 30 },
      { id: 2, name: "Camp Kigali", lat: -1, long: 30 },
      { id: 3, name: "Kimironko", lat: -1, long: 30 },
    ],
  },
  {
    id: 13,
    routeName: "Kacyiru - Nyabugogo",
    routeLength: "5km",
    routeCode: "REM - DOWN",
    busStopsCount: 13,
    assignedBuses: 10,
    startLoc: 6.0,
    destLoc: 24,
    busStops: [
      { id: 1, name: "City Plaza", lat: -1, long: 30 },
      { id: 2, name: "Camp Kigali", lat: -1, long: 30 },
      { id: 3, name: "Kimironko", lat: -1, long: 30 },
    ],
  },
  {
    id: 14,
    routeName: "Nyabugogo - Kimironko",
    routeLength: "5km",
    routeCode: "REM - DOWN",
    busStopsCount: 13,
    assignedBuses: 10,
    startLoc: 6.0,
    destLoc: 24,
    busStops: [
      { id: 1, name: "City Plaza", lat: -1, long: 30 },
      { id: 2, name: "Camp Kigali", lat: -1, long: 30 },
      { id: 3, name: "Kimironko", lat: -1, long: 30 },
    ],
  },
];

export default function Bus() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);

  const [licenceUpdate, setLicenceUpdate] = useState("");
  const [busStatusUpdate, setBusStatusUpdate] = useState("");
  const [assignedRouteUpdate, setassignedRouteUpdate] = useState("");
  const [assignedRouteUpdateInpt, setassignedRouteUpdateInpt] = useState("");
  const [
    charCountAssignedRouteupdate,
    setCharCountAssigneRouteupdate,
  ] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setLicenceUpdate("");
    setassignedRouteUpdate("");
    setassignedRouteUpdateInpt("");
    setCharCountAssigneRouteupdate(0);
    setOpen(false);
  };

  // change state when a row is selected
  useEffect(() => {
    if (selected.length === 1) {
      const selectedBus = rows.filter((bus) => bus.ID === selected[0]);

      setLicenceUpdate(selectedBus[0].Licence_Number);
      setBusStatusUpdate(selectedBus[0].Status);
    }
  }, [selected]);

  const [rows, setRows] = useState([
    createData(1, "RAA279W", "Nyabugogo_kacyiru_Remera", "inactive"),
    createData(2, "RAA279W", "Nyabugogo_kinamba_kagugu", "inactive"),
    createData(3, "RAA279W", "Nyabugogo_gatenga_nyanza", "inactive"),
    createData(4, "RAA279W", "Nyabugogo_kimisagara_Nyamirambo", "inactive"),
    createData(5, "RAA279W", "Nyabugogo_karuruma_Gatsata", "inactive"),
    createData(6, "RAA279W", "Nyabugogo_kacyiru_Remera", "inactive"),
    createData(7, "RAA279W", "Nyabugogo_kinamba_kagugu", "inactive"),
    createData(9, "RAA279W", "Nyabugogo_gatenga_nyanza", "inactive"),
    createData(10, "RAA279W", "Nyabugogo_kimisagara_Nyamirambo", "inactive"),
    createData(11, "RAA279W", "Nyabugogo_karuruma_Gatsata", "inactive"),
  ]);
  const headCells = [
    {
      id: "ID",
      numeric: true,
      disablePadding: false,
      label: "Bus ID",
    },
    {
      id: "Licence_Number",
      numeric: false,
      disablePadding: false,
      label: "Licence Number",
    },
    {
      id: "Assigned_Route",
      numeric: false,
      disablePadding: false,
      label: "Assigned Route",
    },
    {
      id: "Status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },

    paper: {
      width: "100%",
      height: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      height: "100%",
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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      margin: "0 auto",
    },
    paper2: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    rootUpdate: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
    rootCreate: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  }));
  const classes = useStyles();

  function createData(ID, Licence_Number, Assigned_Route, Status) {
    return { ID, Licence_Number, Assigned_Route, Status };
  }

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ID);
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
    setRows([...rows.filter((row) => rowIds.indexOf(row.ID) === -1)]);
    setSelected([]);
  };

  const [createLicence, setCreateLicence] = useState("");
  const [createAssignedRoute, setCreateAssignedRoute] = useState("");
  const [createAssignedRouteInp, setCreateAssignedRouteInp] = useState("");
  const [charCountAssignedRoute, setCharCountAssigneRoute] = useState("");
  const [createBusStatus, setCreateBusStatus] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreateCancel = () => {
    setCreateLicence("");
    setCreateAssignedRoute("");
    setCreateAssignedRouteInp("");
    setCharCountAssigneRoute(0);
    setCreateOpen(false);
  };
  const handleChange = (Event) => {
    const { name, value } = Event.target;
    setCharCountAssigneRouteupdate(value ? value.length : 0);
    if (name === "assignedRouteUpdate") {
      setassignedRouteUpdate(value);
      setassignedRouteUpdateInpt(value);
    }
  };
  const handleChangeCr = (Event) => {
    const { name, value } = Event.target;
    setCharCountAssigneRoute(value ? value.length : 0);
    if (name === "createAssignedRoute") {
      setCreateAssignedRoute(value);
      setCreateAssignedRouteInp(value);
    }
  };
  const handleCreateBus = () => {
    const lastId = rows[rows.length - 1].ID;
    if ((createLicence, createBusStatus, createAssignedRoute))
      rows.push({
        ID: lastId + 1,
        Licence_Number: createLicence,
        Status: createBusStatus,
        Assigned_Route: createAssignedRoute,
      });

    setRows(rows);

    setCreateLicence("");
    setCreateBusStatus("");
    setCreateAssignedRoute("");
    setCreateAssignedRouteInp("");
    setCharCountAssigneRoute(0);

    handleCreateClose();
  };
  const handleSave = () => {
    rows.forEach((bus, index) => {
      if (bus.ID === selected[0]) {
        rows[index].Licence_Number = licenceUpdate;
        rows[index].Status = busStatusUpdate;

        if (assignedRouteUpdate) {
          rows[index].Assigned_Route = assignedRouteUpdate;
        }

        setRows(rows);

        setCharCountAssigneRouteupdate(0);
        setassignedRouteUpdateInpt("");
        setassignedRouteUpdate("");
        setSelected([]);

        handleClose();
      }
    });
  };
  return (
    <React.Fragment>
      {createOpen && (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={createOpen}
          onClose={handleCreateClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={createOpen}>
            <div className={classes.paper2}>
              <form className={classes.rootCreate} noValidate>
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-licence-create" }}
                  label="Licence Number"
                  variant="outlined"
                  value={createLicence}
                  onChange={(e) => setCreateLicence(e.target.value)}
                  required={true}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-status-create" }}
                  label="Status"
                  variant="outlined"
                  value={createBusStatus}
                  onChange={(e) => setCreateBusStatus(e.target.value)}
                  required={true}
                />

                <FormControl className={classes.formControl}>
                  {charCountAssignedRoute < 2 ? (
                    <TextField
                      id="standard-basic"
                      name="createAssignedRoute"
                      label="Add an Assigned Route"
                      type="text"
                      style={{ width: "100%" }}
                      margin="dense"
                      inputProps={{ "data-testid": "add-Assigned-Route-cr" }}
                      value={createAssignedRoute}
                      onChange={handleChangeCr}
                      autoFocus={true}
                      required={true}
                    />
                  ) : (
                    <Autocomplete
                      type="text"
                      name="createAssignedRoute"
                      style={{ width: "100%" }}
                      value={createAssignedRouteInp}
                      onChange={(event, newValue) => {
                        setCreateAssignedRouteInp(newValue);
                        setCharCountAssigneRoute(
                          newValue ? newValue.length : 0
                        );
                      }}
                      inputValue={createAssignedRoute}
                      onInputChange={(event, newInputValue) => {
                        setCreateAssignedRoute(newInputValue);
                        setCharCountAssigneRoute(
                          newInputValue ? newInputValue.length : 0
                        );
                      }}
                      freeSolo={true}
                      options={SampleRoute.map((option) => option.routeName)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Add an Assigned Route"
                          margin="dense"
                          autoFocus={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "add-Assigned-Route-cr",
                          }}
                          required={true}
                        />
                      )}
                    />
                  )}
                </FormControl>

                <Button
                  data-testid="cancel-create-bus-btn"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<CancelIcon />}
                  onClick={() => handleCreateCancel()}
                >
                  Cancel
                </Button>

                <Button
                  data-testid="create-bus-btn"
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  onClick={() => handleCreateBus()}
                >
                  Create Bus
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      )}

      {open && (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper2}>
              <form className={classes.rootUpdate} noValidate>
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "licence-number-update" }}
                  label="Licence Number"
                  variant="outlined"
                  value={licenceUpdate}
                  onChange={(e) => setLicenceUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-status-update" }}
                  label="bus status"
                  variant="outlined"
                  value={busStatusUpdate}
                  onChange={(e) => setBusStatusUpdate(e.target.value)}
                />

                <FormControl className={classes.formControl}>
                  {charCountAssignedRouteupdate < 2 ? (
                    <TextField
                      id="standard-basic"
                      name="assignedRouteUpdate"
                      label="Add a Assigned Route"
                      type="text"
                      style={{ width: "100%" }}
                      margin="dense"
                      inputProps={{ "data-testid": "add-Assigned-Route" }}
                      value={assignedRouteUpdate}
                      onChange={handleChange}
                      autoFocus={true}
                    />
                  ) : (
                    <Autocomplete
                      type="text"
                      name="assignedRouteUpdate"
                      style={{ width: "100%" }}
                      value={assignedRouteUpdate}
                      onChange={(event, newValue) => {
                        setassignedRouteUpdate(newValue);
                        setCharCountAssigneRouteupdate(
                          newValue ? newValue.length : 0
                        );
                      }}
                      inputValue={assignedRouteUpdateInpt}
                      onInputChange={(event, newInputValue) => {
                        setassignedRouteUpdateInpt(newInputValue);
                        setCharCountAssigneRouteupdate(
                          newInputValue ? newInputValue.length : 0
                        );
                      }}
                      freeSolo={true}
                      options={SampleRoute.map((option) => option.routeName)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Add a Assigned Route"
                          margin="dense"
                          autoFocus={true}
                          inputProps={{
                            ...params.inputProps,
                            type: "search",
                            "data-testid": "add-Assigned-route",
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
                  data-testid="update-bus-btn"
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

      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          type="bus"
          tableTitle={"Buses"}
          numSelected={selected.length}
          deleteButtonTitle={"Delete Bus"}
          updateButtonTitle={"Update Bus"}
          createButtonTitle={"Create a Bus"}
          deleteRow={deleteRow}
          selected={selected}
          updateModalOpen={open}
          setUpdateModalOpen={handleOpen}
          createModalOpen={createOpen}
          setCreateModalOpen={handleCreateOpen}
        />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <EnhancedTableHead
              hasEmptyCell={false}
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
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.ID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.ID}
                      </TableCell>
                      <TableCell align="left">{row.Licence_Number}</TableCell>
                      <TableCell align="left">{row.Assigned_Route}</TableCell>
                      <TableCell align="left">{row.Status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
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
    </React.Fragment>
  );
}
