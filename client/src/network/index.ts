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

export const loadMyInfo = async (token: string) => {
  const session = await apiFetch(token)({
    method: "GET",
    uri: API_BASE_URI + "/user/me",
  })

  return session;
};

export const updateSessionById = async (token: string, id: number, time: number, player: string) => {
  await apiFetch(token)({
    method: "PUT",
    uri: API_BASE_URI + "/session/" + id,
    content: { time, player },
  })

  return null;
};

export const removeSession = async (token: string, id: number) => {
  await apiFetch(token)({
    method: "DELETE",
    uri: API_BASE_URI + "/session/" + id,
  })

  return null;
};
