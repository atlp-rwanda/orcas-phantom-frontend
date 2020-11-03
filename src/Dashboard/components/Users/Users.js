import React from "react";
import { useState, useEffect } from "react";
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
import Fade from "./FadeComponent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";

export default function Users() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([
    createData("Ange", "inange203@gmail.com", "Active"),
    createData("Fifi", "fifina@gmail.com", "Active"),
    createData("Kiki", "kikin@gmail.com", "Active"),
    createData("Amizero", "amy@gmail.com", "Active"),
    createData("Lyly", "lilikim@gmail.com", "inactive"),
    createData("Soso", "soso@gmail.com", "inanctive"),
    createData("Louise", "lulu0@gmail.com", "Active"),
    createData("Theo", "the@gmail.com", "Active"),
    createData("Fils", "fils203@gmail.com", "Active"),
    createData("Fille", "fille@gmail.com", "Active"),
  ]);
  const headCells = [
    {
      id: "Name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "Email",
      numeric: false,
      disablePadding: false,
      label: "Email",
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
      marginBottom: theme.spacing(2),
    },
    table: {
      width: "100%",
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

  function createData(Name, Email, CreatedOn, Status) {
    return { Name, Email, CreatedOn, Status };
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
    setRows([...rows.filter((row) => rowIds.indexOf(row.Name) === -1)]);
    setSelected([]);
  };
  const [nameUpdate, setNameUpdate] = useState("");
  const [userEmailUpdate, setUserEmailUpdate] = useState("");
  const [userStatusUpdate, setUserStatusUpdate] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setNameUpdate("");
    setUserEmailUpdate("");
    setUserStatusUpdate("");
    setOpen(false);
  };

  useEffect(() => {
    if (selected.length === 1) {
      const selectedUser = rows.filter((user) => user.Name === selected[0]);
      setNameUpdate(selectedUser[0].Name);
      setUserEmailUpdate(selectedUser[0].Email);
      setUserStatusUpdate(selectedUser[0].Status);
    }
  }, [selected]);
  const [createName, setCreateName] = useState("");
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [createUserStatus, setCreateUserStatus] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleCreateCancel = () => {
    setCreateName("");
    setCreateUserEmail("");
    setCreateUserStatus("");
    setCreateOpen(false);
  };

  const handleCreateUser = () => {
    if ((createName, createUserEmail, createUserStatus))
      rows.push({
        Name: createName,
        Email: createUserEmail,
        Status: createUserStatus,
      });

    setRows(rows);

    setCreateName("");
    setCreateUserEmail("");
    setCreateUserStatus("");

    handleCreateClose();
  };
  const handleSave = () => {
    rows.forEach((user, index) => {
      if (user.Name === selected[0]) {
        rows[index].Name = nameUpdate;
        rows[index].Email = userEmailUpdate;
        rows[index].Status = userStatusUpdate;

        setRows(rows);

        setNameUpdate("");
        setUserEmailUpdate("");
        setUserStatusUpdate("");
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
                  inputProps={{ "data-testid": "Name-create" }}
                  label="Name"
                  variant="outlined"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  required={true}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "Email-create" }}
                  label="Email"
                  variant="outlined"
                  value={createUserEmail}
                  onChange={(e) => setCreateUserEmail(e.target.value)}
                  required={true}
                />

                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "user-status-create" }}
                  label="Status"
                  variant="outlined"
                  value={createUserStatus}
                  onChange={(e) => setCreateUserStatus(e.target.value)}
                  required={true}
                />

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
                  inputProps={{ "data-testid": "Name-update" }}
                  label="Name"
                  variant="outlined"
                  value={nameUpdate}
                  onChange={(e) => setNameUpdate(e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "user-status-update" }}
                  label="User status"
                  variant="outlined"
                  value={userStatusUpdate}
                  onChange={(e) => setUserStatusUpdate(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  inputProps={{ "data-testid": "user-email-update" }}
                  label="User Email"
                  variant="outlined"
                  value={userEmailUpdate}
                  onChange={(e) => setUserEmailUpdate(e.target.value)}
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

      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          type="user"
          tableTitle={"Users"}
          numSelected={selected.length}
          deleteButtonTitle={"Delete user"}
          updateButtonTitle={"Update user"}
          createButtonTitle={"Create a user"}
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
                  const isItemSelected = isSelected(row.Name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Name}
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
                        {row.Name}
                      </TableCell>
                      <TableCell align="left">{row.Email}</TableCell>
                      <TableCell align="left">{row.CreatedOn}</TableCell>
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
