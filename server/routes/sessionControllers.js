import { validationError, authorizationError, status } from './misc.js';
import {
  findAllSessions,
  findUserSessions,
  createSession,
  findSessionById,
  updateSession,
  destroySession,
  doesSessionBelongsToUser,
} from '../services/session.js';

const serializePopulatedSession = (session) => {
  const {
    id,
    time,
    playerId: playerInstance,
    userId: userInstance,
  } = session;

  const serializableSession = {
    id,
    time,
    player: playerInstance?.name,
    username: userInstance?.username,
  };

  return serializableSession;
};

export const getUserSessions = async (model, { params, user }) => {
  const userIdAsNumber = parseInt(params?.userId || '', 10);
  if (params?.userId != (`${userIdAsNumber}`) || !model.isDbId(userIdAsNumber)) {
    const error = validationError('params.userId', 'Must be a valid database id', params?.userId);
    return { error };
  }

  const sessions = await findUserSessions(model, userIdAsNumber, user);
  if (!sessions.length) {
    return { result: [] };
  }

  const serializableSessions = sessions.map(serializePopulatedSession);

  return { result: serializableSessions };
};

export const getAllSessions = async (model) => {
  const sessions = await findAllSessions(model);
  if (!sessions.length) {
    return { result: null };
  }

  const serializableSessions = sessions.map(serializePopulatedSession);

  return { result: serializableSessions };
};

export const postSession = async (model, { body, user }) => {
  const { player, time } = body || {};
  if (!player || typeof player != 'string') {
    const error = validationError('body.player', 'Must be a non-empty string', player);
    return { error };
  }

  const timeAsNumber = parseInt(time || '', 10);
  if (time != (`${timeAsNumber}`) || isNaN(timeAsNumber)) {
    const error = validationError('body.time', 'Must be a number', time);
    return { error };
  }

  const session = await createSession(model, { player, time: timeAsNumber }, user);
  if (!session) {
    return { result: null, status: status.RESOURCE_NOT_FOUND };
  }

  const serializableSession = serializePopulatedSession(session);

  return { result: serializableSession };
};

export const getSession = async (model, { params }) => {
  const sessionIdAsNumber = parseInt(params?.sessionId || '', 10);
  if (params?.sessionId != (`${sessionIdAsNumber}`) || !model.isDbId(sessionIdAsNumber)) {
    const error = validationError('params.sessionId', 'Must be a valid database id', params?.sessionId);
    return { error };
  }

  const session = await findSessionById(model, sessionIdAsNumber);
  if (!session) {
    return { result: null, status: status.RESOURCE_NOT_FOUND };
  }

  const serializableSession = serializePopulatedSession(session);

  return { result: serializableSession };
};

export const putSession = async (model, { params, body, user }) => {
  const sessionIdAsNumber = parseInt(params?.sessionId || '', 10);
  if (params?.sessionId != (`${sessionIdAsNumber}`) || !model.isDbId(sessionIdAsNumber)) {
    const error = validationError('params.sessionId', 'Must be a valid database id', params?.sessionId);
    return { error };
  }

  const belongs = await doesSessionBelongsToUser(model, user, sessionIdAsNumber);
  if (!belongs) {
    return { error: authorizationError('Session does not belong to user') };
  }

  const { player, time } = body || {};
  if (!player && !time) {
    const error = validationError('body', 'Must contain at least a session field to update', player);
    return { error };
  }

  if (player && typeof player != 'string') {
    const error = validationError('body.player', 'Must be a non-empty string', player);
    return { error };
  }

  const timeAsNumber = parseInt(time || '', 10);
  if (time && (time != (`${timeAsNumber}`) || isNaN(timeAsNumber))) {
    const error = validationError('body.time', 'Must be a number', time);
    return { error };
  }

  const updated = await updateSession(model, sessionIdAsNumber, { player, time });
  if (!updated) {
    return { result: null, status: status.RESOURCE_NOT_FOUND };
  }

  return { result: updated, status: status.RESOURCE_UPDATED };
};

export const deleteSession = async (model, { params, user }) => {
  const sessionIdAsNumber = parseInt(params?.sessionId || '', 10);
  if (params?.sessionId != (`${sessionIdAsNumber}`) || !model.isDbId(sessionIdAsNumber)) {
    const error = validationError('params.sessionId', 'Must be a valid database id', params?.sessionId);
    return { error };
  }

  const belongs = await doesSessionBelongsToUser(model, sessionIdAsNumber, user.id);
  if (!belongs) {
    return { error: authorizationError('Session does not belong to user') };
  }

  const destroyed = await destroySession(model, sessionIdAsNumber);
  if (!destroyed) {
    return { result: null, status: status.RESOURCE_NOT_FOUND };
  }

  return { result: null, status: status.RESOURCE_DELETED };
};
