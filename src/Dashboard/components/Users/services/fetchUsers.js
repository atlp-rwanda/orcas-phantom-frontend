import axios from "axios";

export default async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};
