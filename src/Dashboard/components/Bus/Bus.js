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
import { CircularProgress } from "@material-ui/core";
import EnhancedTableHead from "shared/components/dashboard/EnhancedTableHead";
import EnhancedTableToolbar from "shared/components/dashboard/EnhancedTableToolbar";
import TablePagination from "shared/components/dashboard/TablePagination";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "./FadeComponent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

export default function Bus() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);


  const [busPlateUpdate, setBusPlateUpdate] = useState("");
  const [routIdUpdate, setRoutIdUpdate] = useState();
  const [busStatusUpdate, setBusStatusUpdate] = useState("");
  const [currentLocationUpdate, setCurrentLocationUpdate] = useState("");

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    
    setBusPlateUpdate("");
    setRoutIdUpdate();
    setBusStatusUpdate("");
    setCurrentLocationUpdate("");
   
    setOpen(false);
  };

  // change state when a row is selected
  useEffect(() => {
    if (selected.length === 1) {
      const selectedBus = rows.filter(
        (bus) => bus.id === selected[0]
      );

      setBusPlateUpdate(selectedBus[0].bus_plate);
      setRoutIdUpdate((selectedBus[0].routId));
      setBusStatusUpdate(selectedBus[0].bus_status);
      setCurrentLocationUpdate(selectedBus[0].currentLocation);

    }
  }, [selected]);
  const [rows, setRows] = useState([

  ]);
  console.log(rows);

  useEffect(() => {
    Axios.get(
      "http://localhost:9000/buses",
      {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA3MDAwNzUwfQ.LV5sOR3bll3wVT95UDKRdaVWXVUSFet1e29a87dmplQ"
        },
      }
    )
      .then((response) => {
        setRows(response.data.buses);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);



  const indexNumericSort = 0;
  const indexCharSort = 1;
  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: false,
      label: "Bus ID",
    },
    {
      id: "bus_plate",
      numeric: false,
      disablePadding: false,
      label: "Bus Plate",
    },
    {
      id: "routId",
      numeric: false,
      disablePadding: false,
      label: "Route ID ",
    },
    {
      id: "bus_status",
      numeric: false,
      disablePadding: false,
      label: "Bus Status",
    },
    {
      id: "currentLocation",
      numeric: false,
      disablePadding: false,
      label: "Current Location",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },

    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
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
    setRows([...rows.filter((row) => rowIds.indexOf(row.id) === -1)]);
    setSelected([]);
  };

  const [createBusPlate, setCreateBusPlate] = useState("");
  const [createRouteID, setCreateRouteID] = useState();
  const [createBusStatus, setCreateBusStatus] = useState("");
  const [createCurrentLocation, setCreateCurrentLocation] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreateCancel = () => {
    setCreateBusPlate("");
    setCreateRouteID();
    setCreateBusStatus("");
    setCreateCurrentLocation("");
    setCreateOpen(false);
  };
  const handleCreateBus = () => {
    if (createBusPlate && createRouteID && createBusStatus && createCurrentLocation) {
      Axios({
        method: "POST",
        url: "http://localhost:9000/buses",
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA3MDAwNzUwfQ.LV5sOR3bll3wVT95UDKRdaVWXVUSFet1e29a87dmplQ",

        },
        data: {
          bus_plate: createBusPlate,
          routId: createRouteID,
          bus_status: createBusStatus,
          currentLocation: createCurrentLocation,
        },
      })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });


      setRows(rows);

      setCreateBusStatus("");
      setCreateRouteID("");
      setCreateBusStatus("");
      setCreateCurrentLocation("");

      handleCreateClose();
    } else {
      toast.error(
        "all field must be filled",
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
    }
  }
  const handleSave = () => {
    rows.forEach((bus) => {
      if (bus.id === selected[0]) {
        Axios({
          method: "patch",
          url: "http://localhost:80/buses/"+ bus.id,
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA3MDAwNzUwfQ.LV5sOR3bll3wVT95UDKRdaVWXVUSFet1e29a87dmplQ",

          },
          data: {
            bus_plate: busPlateUpdate,
            routId: routIdUpdate,
            bus_status: busStatusUpdate,
            currentLocation: currentLocationUpdate,
          },
        })
          .then((response) => {
            console.log(response.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err.message);
          });

        setRows(rows);

        setBusPlateUpdate("");
        setRoutIdUpdate();
        setBusStatusUpdate("");
        setCurrentLocationUpdate("");
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
                  inputProps={{ "data-testid": "bus-plate-create" }}
                  label="Bus Plate"
                  variant="outlined"
                  value={createBusPlate}
                  onChange={(e) => setCreateBusPlate(e.target.value)}
                  required={true}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-routeId-create" }}
                  label="Route ID"
                  variant="outlined"
                  value={createRouteID}
                  onChange={(e) => setCreateRouteID(e.target.value)}
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
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-currentLocation-create" }}
                  label="Current Location"
                  variant="outlined"
                  value={createCurrentLocation}
                  onChange={(e) => setCreateCurrentLocation(e.target.value)}
                  required={true}
                />

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
                  Create Route
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
                  inputProps={{ "data-testid": "bus-plate-update" }}
                  label="Bus Plate"
                  variant="outlined"
                  value={busPlateUpdate}
                  onChange={(e) => setBusPlateUpdate(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-routeId-update" }}
                  label="Route ID"
                  variant="outlined"
                  value={routIdUpdate}
                  onChange={(e) => setRoutIdUpdate(e.target.value)}
                  required={true}
                />

                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-status-update" }}
                  label="bus status"
                  variant="outlined"
                  value={busStatusUpdate}
                  onChange={(e) => setBusStatusUpdate(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "bus-currentLocation-update" }}
                  label="Current Location"
                  variant="outlined"
                  value={currentLocationUpdate}
                  onChange={(e) => setCurrentLocationUpdate(e.target.value)}
                  required={true}
                />

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
        {isLoading ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
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
                  indexNumericSort={indexNumericSort}
                  indexCharSort={indexCharSort}
                />

                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      let count = 0;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          data-testid={
                            index === 0
                              ? "bus-row"
                              : index === 1
                                ? "bus-row2"
                                : ++count
                          }
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
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.bus_plate}</TableCell>
                          <TableCell align="left">{row.routId}</TableCell>
                          <TableCell align="left">{row.bus_status}</TableCell>
                          <TableCell align="left">
                            {row.currentLocation}
                          </TableCell>
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
          </React.Fragment>
        )}
      </Paper>
      <ToastContainer />
    </React.Fragment>
  );
}