import { apiFetch, customFetch } from "./misc";

const API_BASE_URI = "http://localhost:3002"; // TODO à mettre dans le .env
export const login = async (login: string, password: string) => {
  const result = await customFetch({
    method: "POST",
    uri: API_BASE_URI + "/login",
    content: { username: login, password },
  });

  return result;
};
