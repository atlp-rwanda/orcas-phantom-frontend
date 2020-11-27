import { sampleUsers } from "shared/constants/users";

export default async () => {
  const response = await new Promise((resolve) => {
    resolve(sampleUsers);
  });
  return response;
};
