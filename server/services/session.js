import { foreignNames } from '../model/associations.js';

export const findAllSessions = async ({ Session }) => {
  const sessions = await Session
    .find({})
    .populate(foreignNames.user_as)
    .populate(foreignNames.player_as);

  return sessions;
};

export const findUserSessions = async ({ Session }, userId) => {
  const sessions = await Session
    .find({
      userId,
    })
    .populate(foreignNames.user_as)
    .populate(foreignNames.player_as);

  return sessions;
};

const findOrCreatePlayer = async (Player, playerName) => {
  const existingPlayer = await Player.findOne({
    name: playerName,
  });
  if (existingPlayer) return existingPlayer;

  const player = await Player.create({
    name: playerName,
  });
  return player;
};

export const createSession = async (
  { Session, Player },
  { player: playerName, time },
  user,
) => {
  const player = await findOrCreatePlayer(Player, playerName);
  const session = await Session.create({
    time,
    userId: user.id,
    playerId: player.id,
  });

  session.userId = user;
  session.playerId = player;

  return session;
};

export const findSessionById = async ({ Session }, sessionId) => {
  const session = await Session.findById(sessionId);

  await session.populate(foreignNames.user_as);
  await session.populate(foreignNames.player_as);

  return session;
};

export const updateSession = async (
  { Session, Player },
  sessionId,
  { player: playerName, time },
) => {
  const session = await Session.findById(sessionId);
  if (!session) return null;

  let player;
  if (playerName) {
    player = await findOrCreatePlayer(Player, playerName);
    session.playerId = player.id;
  } else {
    await session.populate(foreignNames.player_as);
  }

  if (time) session.time = time;

  await session.save();

  session.userId = player;
  if (playerName) session.playerId = player;

  return session;
};

export const destroySession = async ({ Session }, sessionId) => {
  const session = await Session.findById(sessionId);
  if (!session) return false;

  await session.remove();

  return true;
};

export const doesSessionBelongsToUser = async ({ Session }, user, sessionId) => {
  const session = await Session.findById(sessionId);
  if (!session) return false;

  return session.userId == user.id;
};
