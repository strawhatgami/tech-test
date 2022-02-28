import { apiFetch, customFetch } from "./misc";

const API_BASE_URI = "http://localhost:3002"; // TODO à mettre dans le .env

export const login = async (username: string, password: string) => {
  const result = await customFetch({
    method: "POST",
    uri: API_BASE_URI + "/login",
    content: { username, password },
  });

  return result;
};

export const loadAllSessions = async (token: string) => {
  const sessions = await apiFetch(token)({
    method: "GET",
    uri: API_BASE_URI + "/session/",
  })

  return sessions;
};

export const addNewSession = async (token: string, time: number, player: string) => {
  const session = await apiFetch(token)({
    method: "POST",
    uri: API_BASE_URI + "/session/",
    content: { time, player },
  })

  return session;
};

