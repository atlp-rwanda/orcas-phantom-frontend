import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./PaginationActions";
import PropTypes from "prop-types";

const EnhancedTablePagination = (props) => {
  const {
    rows,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = props;

  return (
    <TablePagination
      rows={rows}
      rowsPerPageOptions={[3, 5, 10]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
    />
  );
};

EnhancedTablePagination.propTypes = {
  rows: PropTypes.array.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default EnhancedTablePagination;
