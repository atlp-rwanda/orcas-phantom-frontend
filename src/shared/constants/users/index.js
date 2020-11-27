// to be used by material head component "EnhancedTableHead" and for sorting
export const indexNumericSort = 2;
export const indexCharSort = 1;
export const headCells = [
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "busId",
    numeric: false,
    disablePadding: false,
    label: "Bus Plate",
  },
];
// data for testing
export const sampleUsers = [
  {
    id: 1,
    username: "Backend Admin",
    email: "gunner@gmail.com",
    role: "admin",
    busId: 1,
    createdAt: "2020-12-09T06:45:50.748Z",
    updatedAt: "2020-12-09T06:45:50.748Z",
  },
];

export const sampleBuses = [
  {
    id: 1,
    bus_status: "active",
    bus_plate: "RAD 345 C",
    routId: 1,
    currentLocation: "39.807222, -76.984722",
    createdAt: "2020-12-09T06:45:50.727Z",
    updatedAt: "2020-12-09T06:45:50.727Z",
  },
];
