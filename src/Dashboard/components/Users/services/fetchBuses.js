import axios from "axios";

export default async (busId, token) => {
  try {
    const response = await axios.get(`http://localhost:9000/buses/${busId}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.bus;
  } catch (e) {
    console.log(e);
  }
};
