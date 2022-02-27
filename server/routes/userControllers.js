export const getRequesterData = async (model, { user }) => {
  const { username, _id } = user;
  const serializableUser = {
    username,
    id: _id,
  };

  return { result: serializableUser };
};
