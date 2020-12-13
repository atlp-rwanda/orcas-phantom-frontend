import { sampleBuses } from "shared/constants/users";

export default async () => {
  const response = await new Promise((resolve) => {
    resolve(sampleBuses);
  });
  return response;
};
