import axios from 'axios'

// const destinationData = [
//   {  "label": "Down Town 1", "value": "down town 1"  },
//   {  "label": "Down Town 2", "value": "down town 2"  },
//   {  "label": "Remera 1", "value": "remera 1" },
//   {  "label": "Remera 2", "value": "remera 2" },
//   {  "label": "Kacyiru", "value": "kacyiru"  }
// ];

// export default destinationData;
const data = axios.get(
  "https://cors-anywhere.herokuapp.com/" +
  "https://phantom-backend.herokuapp.com/busstop",

  {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJndW5uZXJAZ21haWwuY29tIiwiaWF0IjoxNjA1NzI3MTIwfQ.L1ajl88wnXmfAgDF-wSCRP4PGBzQUNfrwO3aMghlte4"
    },
  }
).then(
  busstops => busstops.data
  // destinationData = bsData.map(busstop => ({
  //   ...busstop,
  //   value: busstop.busStopName,
  // }))

)




export const destinationData = data.then(val => val);

export  let destinationBS = destinationData;