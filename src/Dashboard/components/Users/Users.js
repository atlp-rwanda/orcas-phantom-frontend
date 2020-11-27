import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableContainer from "@material-ui/core/TableContainer";
import { CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
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
  headCells,
  indexNumericSort,
  indexCharSort,
} from "shared/constants/users/";
import {
  UsersWrapper,
  useStyles,
  useStylesCreate,
  useStylesUpdate,
} from "shared/styles/dashboard/users/";
import { getComparator, stableSort } from "./utils";
import fetchUsers from "./services/fetchUsers";
import fetchBus from "./services/fetchBuses";

const Users = () => {
  // **************************************************
  // initial table  state
  // **************************************************
  const token =
    localStorage.getItem("user") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA1ODQ5Mjg2fQ.ua5hc_bUGJar3kpxVRAa2L5ajxSxvq16yPNAJwjnZ1c";
  const currentRole = localStorage.getItem("role") || "bus";
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("email");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [emailUpdate, setEmailUpdate] = useState("");
  const [usernameUpdate, setUsernameUpdate] = useState("");

  const [emailCreate, setEmailCreate] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");
  const [usernameCreate, setUsernameCreate] = useState("");

  // for add bus in update modal
  const [addBus, setAddBus] = useState("");
  const [addBs, setAddBs] = useState("");
  const [charCountAddBus, setCharCountAddBus] = useState(0);

  // for add bus in create modal
  const [addBusCr, setAddBusCr] = useState("");
  const [addBsCr, setAddBsCr] = useState("");
  const [charCntAddBus, setCharCntAddBus] = useState(0);

  const [rows, setRows] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const [buses, setBuses] = useState([]);

  const classes = useStyles();
  const classesUpdate = useStylesUpdate();
  const classesCreate = useStylesCreate();

  // ******************************************************************
  // end of initial table state
  // ******************************************************************

  // fetch users
  useEffect(() => {
    fetchUsers(
      `https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/api/users`,
      token
    )
      .then((res) => {
        setNumUsers(res.length);
        setFetchedUsers(res);
      })
      .catch((e) => console.log(e));
  }, []);

  // fetch associated buses with users
  useEffect(() => {
    fetchedUsers.map(async (user) =>
      fetchBus(user.busId, token)
        .then((bus) => {
          setRows((prevUsers) => [
            ...prevUsers,
            {
              userId: user.id,
              email: user.email,
              username: user.username,
              role: user.role,
              bus,
            },
          ]);
        })
        .catch((e) => console.log(e))
    );
  }, [fetchedUsers]);

  // stop loading once all users with their associated buses have been fetched
  useEffect(() => {
    if (rows.length === numUsers) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/buses/`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          setBuses(res.data.buses);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  }, [rows]);

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
      const newSelecteds = rows.map((n) => n.userId);
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

  const handleChangePage = (event, newPage) => setPage(newPage);

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

  // change when a row is selected
  useEffect(() => {
    if (selected.length === 1) {
      const selectedUser = rows.filter((user) => user.userId === selected[0]);

      setEmailUpdate(selectedUser[0].email);
      setUsernameUpdate(selectedUser[0].username);
      setRoleUpdate(selectedUser[0].role);
      setAddBs(selectedUser[0].bus.bus_plate);
      setAddBsCr(selectedUser[0].bus.bus_plate);
    }
  }, [selected]);

  // *****************************************************
  // functions, hooks for handling auto-suggest functions
  // *****************************************************
  const roleOptions = ["admin", "bus"];
  const [roleCreate, setRoleCreate] = useState(roleOptions[1]);
  const [roleCreateCr, setRoleCreateCr] = useState("");

  const [roleUpdate, setRoleUpdate] = useState("");
  const [roleUpdateCh, setRoleUpdateCh] = useState("");

  const handleChange = (Event) => {
    const { name, value } = Event.target;
    setCharCountAddBus(value ? value.length : 0);
    if (name === "addBs") {
      setAddBs(value);
      setAddBus(value);
    }
  };

  const handleChangeCr = (Event) => {
    const { name, value } = Event.target;
    setCharCntAddBus(value ? value.length : 0);
    if (name === "addBsCr") {
      setAddBsCr(value);
      setAddBusCr(value);
    }
  };

  // ***************************************************************
  // end of functions, hooks for handling auto-suggest functions
  // ***************************************************************

  // functions to handle create and update modals opening, closing, cancelling
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreateCancel = () => {
    setEmailCreate("");
    setUsernameCreate("");
    setRoleCreate("");
    setAddBusCr("");
    setAddBsCr("");
    setCharCntAddBus(0);
    setCreateOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setSelected([]);
    setOpen(false);
  };

  // function to create user
  const handleCreateUser = () => {
    if ((emailCreate, passwordCreate, roleCreate, usernameCreate, addBusCr)) {
      if (roleOptions.indexOf(roleCreate) === -1) {
        toast.error("Invalid role. It can only be 'admin' or 'bus'", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      if (roleCreate === "admin" && currentRole === "bus") {
        toast.error("Unauthorized to create user with 'admin' priviledges", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      const availableBuses = buses.map((bus) => bus.bus_plate);
      let selectedBusId = null;

      if (availableBuses.indexOf(addBusCr) === -1) {
        toast.error("Invalid bus plate. Please choose from the suggestions", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      } else {
        selectedBusId = buses
          .filter((bus) => bus.bus_plate === addBusCr)
          .map((bus) => bus.id)[0];

        axios({
          method: "POST",
          url:
            "https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/api/signup",
          headers: {
            Authorization: token,
          },
          data: {
            email: emailCreate,
            password: passwordCreate,
            username: usernameCreate,
            role: roleCreate,
            busId: selectedBusId,
          },
        })
          .then((res) => {
            setRows((prevUsers) => [
              ...prevUsers,
              {
                userId: prevUsers[prevUsers.length - 1].userId + 1,
                email: emailCreate,
                username: usernameCreate,
                role: roleCreate,
                bus: buses.filter((bus) => bus.bus_plate === addBusCr)[0],
              },
            ]);

            setEmailCreate("");
            setUsernameCreate("");
            setPasswordCreate("");
            setRoleCreate(roleOptions[1]);
            setRoleCreateCr("");
            setAddBusCr();
            setAddBsCr();
            setCharCntAddBus(0);

            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            handleCreateClose();
          })
          .catch((e) => console.log("we met an error", e));
      }
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

  // function to update user
  const handleSave = () => {
    // error handling
    if (roleUpdate === "admin" || roleUpdate === "bus") {
      if (roleUpdate === "admin" && currentRole === "bus") {
        toast.error("Unauthorized to update user's role to 'admin'", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (buses.filter((bus) => bus.bus_plate === addBs).length !== 0) {
          rows.forEach((user, index) => {
            if (user.userId === selected[0]) {
              const selectedBusId = buses
                .filter((bus) => bus.bus_plate === addBs)
                .map((bus) => bus.id)[0];

              const emailNotUpdated = {
                username: usernameUpdate,
                role: roleUpdate,
                busId: selectedBusId,
              };

              const usernameNotUpdated = {
                email: emailUpdate,
                role: roleUpdate,
                busId: selectedBusId,
              };

              const emailUsernameNoUpdate = {
                role: roleUpdate,
                busId: selectedBusId,
              };

              axios({
                method: "PUT",
                url: `https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/api/users/${selected[0]}`,
                headers: {
                  Authorization: token,
                },
                // prettier-ignore
                data:
                  emailUpdate === rows[index].email &&
                    usernameUpdate === rows[index].username
                    ? emailUsernameNoUpdate
                    : usernameUpdate === rows[index].username
                      ? usernameNotUpdated
                      : emailUpdate === rows[index].email
                        ? emailNotUpdated
                        : {
                          email: emailUpdate,
                          username: usernameUpdate,
                          role: roleUpdate,
                          busId: selectedBusId,
                        },
              })
                .then((res) => {
                  rows[index].username = usernameUpdate;
                  rows[index].email = emailUpdate;
                  rows[index].role = roleUpdate;
                  rows[index].bus = buses.filter(
                    (bus) => bus.bus_plate === addBs
                  )[0];

                  toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });

                  setRows(rows);

                  setCharCountAddBus(0);
                  setAddBus("");
                  setAddBs("");
                  setSelected([]);

                  handleClose();
                })
                .catch((e) => console.log(e));
            }
          });
        } else {
          toast.error("Unable to find a bus with the given bus plate", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setAddBus("");
          setAddBs("");

          return;
        }
      }
    } else {
      toast.error("Role can only be 'admin' or 'bus'", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setRoleUpdate();
      setRoleUpdateCh();

      return;
    }
  };

  // function to delete user(s)
  const deleteUser = (rowIds) => {
    if (currentRole === "admin") {
      if (rowIds.length === 1) {
        const userId = rows
          .filter((user) => rowIds.indexOf(user.userId) !== -1)
          .map((user) => user.userId)[0];
        axios({
          method: "DELETE",
          url: `https://cors-anywhere.herokuapp.com/https://phantom-backend.herokuapp.com/api/users/${userId}`,
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            console.log(res);
            setRows([
              ...rows.filter((row) => rowIds.indexOf(row.userId) === -1),
            ]);
            setSelected([]);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((e) => console.log(e));
      } else {
        toast.info("Deleting multiple users not yet implemented", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Unauthorized to delete user(s)", {
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

  return (
    <React.Fragment>
      <UsersWrapper data-testid="users-wrapper" testID="users-wrapper">
        {/* create user modal */}
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
                <form className={classesCreate.root}>
                  <TextField
                    inputProps={{ "data-testid": "user-name-create" }}
                    label="User Name"
                    variant="outlined"
                    value={usernameCreate}
                    onChange={(e) => setUsernameCreate(e.target.value)}
                    required={true}
                  />

                  <TextField
                    inputProps={{ "data-testid": "user-email-create" }}
                    label="User Email"
                    variant="outlined"
                    value={emailCreate}
                    onChange={(e) => setEmailCreate(e.target.value)}
                    required={true}
                    type="email"
                  />

                  <TextField
                    inputProps={{ "data-testid": "user-password-create" }}
                    label="User Password"
                    variant="outlined"
                    value={passwordCreate}
                    onChange={(e) => setPasswordCreate(e.target.value)}
                    required={true}
                  />

                  <Autocomplete
                    type="text"
                    name="role-create"
                    style={{ width: "100%" }}
                    value={roleCreate}
                    onChange={(event, newValue) => {
                      setRoleCreate(newValue);
                    }}
                    inputValue={roleCreateCr}
                    onInputChange={(event, newInputValue) => {
                      setRoleCreateCr(newInputValue);
                    }}
                    options={roleOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          "data-testid": "user-role-create",
                        }}
                        label="User Role"
                        variant="outlined"
                        required={true}
                      />
                    )}
                  />

                  <FormControl className={classesCreate.formControl}>
                    {charCntAddBus < 2 ? (
                      <TextField
                        id="standard-basic"
                        name="addBsCr"
                        label="Add a Bus"
                        type="text"
                        style={{ width: "100%" }}
                        margin="dense"
                        inputProps={{ "data-testid": "add-bus-cr" }}
                        value={addBsCr}
                        onChange={handleChangeCr}
                        autoFocus={true}
                        required={true}
                      />
                    ) : (
                      <Autocomplete
                        type="text"
                        name="addBsCr"
                        style={{ width: "100%" }}
                        value={addBusCr}
                        onChange={(event, newValue) => {
                          setAddBusCr(newValue);
                          setCharCntAddBus(newValue ? newValue.length : 0);
                        }}
                        inputValue={addBsCr}
                        onInputChange={(event, newInputValue) => {
                          setAddBsCr(newInputValue);
                          setCharCntAddBus(
                            newInputValue ? newInputValue.length : 0
                          );
                        }}
                        freeSolo={true}
                        options={buses.map((bus) => bus.bus_plate)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Add a Bus"
                            margin="dense"
                            inputProps={{
                              ...params.inputProps,
                              type: "search",
                              "data-testid": "add-bus-cr",
                            }}
                            autoFocus={true}
                            required={true}
                          />
                        )}
                      />
                    )}
                  </FormControl>

                  <br />

                  <Button
                    data-testid="cancel-create-user-btn"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<CancelIcon />}
                    onClick={() => handleCreateCancel()}
                  >
                    Cancel
                  </Button>

                  <Button
                    data-testid="create-user-btn"
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={() => handleCreateUser()}
                  >
                    Create User
                  </Button>
                </form>
              </div>
            </Fade>
          </Modal>
        )}

        {/* update user modal */}
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
                    inputProps={{ "data-testid": "user-name-update" }}
                    label="User Name"
                    variant="outlined"
                    value={usernameUpdate}
                    onChange={(e) => setUsernameUpdate(e.target.value)}
                  />

                  <TextField
                    inputProps={{ "data-testid": "user-email-update" }}
                    label="User Email"
                    variant="outlined"
                    value={emailUpdate}
                    onChange={(e) => setEmailUpdate(e.target.value)}
                    type="email"
                  />

                  <Autocomplete
                    type="text"
                    name="role-update"
                    style={{ width: "100%" }}
                    value={roleUpdate}
                    onChange={(event, newValue) => {
                      setRoleUpdate(newValue);
                    }}
                    inputValue={roleUpdateCh}
                    onInputChange={(event, newInputValue) => {
                      setRoleUpdateCh(newInputValue);
                    }}
                    options={roleOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          "data-testid": "user-role-update",
                        }}
                        label="User Role"
                        variant="outlined"
                      />
                    )}
                  />

                  <FormControl className={classesCreate.formControl}>
                    {charCountAddBus < 2 ? (
                      <TextField
                        id="standard-basic"
                        name="addBs"
                        label="Add a Bus"
                        type="text"
                        style={{ width: "100%" }}
                        margin="dense"
                        inputProps={{ "data-testid": "add-bus-update" }}
                        value={addBs}
                        onChange={handleChange}
                        autoFocus={true}
                      />
                    ) : (
                      <Autocomplete
                        type="text"
                        name="addBs"
                        style={{ width: "100%" }}
                        value={addBus}
                        onChange={(event, newValue) => {
                          setAddBus(newValue);
                          setCharCountAddBus(newValue ? newValue.length : 0);
                        }}
                        inputValue={addBs}
                        onInputChange={(event, newInputValue) => {
                          setAddBs(newInputValue);
                          setCharCountAddBus(
                            newInputValue ? newInputValue.length : 0
                          );
                        }}
                        freeSolo={true}
                        options={buses.map((bus) => bus.bus_plate)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Add a Bus"
                            margin="dense"
                            inputProps={{
                              ...params.inputProps,
                              type: "search",
                              "data-testid": "add-bus-update",
                            }}
                            autoFocus={true}
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
                    data-testid="update-user-btn"
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

        {/* users table */}
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            type="user"
            tableTitle={"Users"}
            numSelected={selected.length}
            deleteButtonTitle={"Delete User"}
            updateButtonTitle={"Update User"}
            createButtonTitle={"Create a User"}
            deleteRow={deleteUser}
            selected={selected}
            updateModalOpen={open}
            setUpdateModalOpen={handleOpen}
            createModalOpen={createOpen}
            setCreateModalOpen={handleCreateOpen}
          />

          {isLoading ? (
            <div className={useStyles.divFetchingUsers}>
              <CircularProgress />
            </div>
          ) : (
            <TableContainer>
              <Table
                stickyHeader
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
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
                  {/* generate user rows from the "rows" variable */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      const isItemSelected = isSelected(user.userId);
                      const labelId = `enhanced-table-checkbox-${user.userId}`;
                      return (
                        <Row
                          index={index}
                          key={user.userId}
                          user={user}
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
          )}

          <TablePagination
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {/* end of users table */}
      </UsersWrapper>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Users;
