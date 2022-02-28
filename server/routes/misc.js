export const validationError = (fieldPath, reason, value) => {
  const err = new Error(reason);
  err.field = fieldPath;
  err.value = value;
  err.status = 400;
  return err;
};

export const authorizationError = (reason) => {
  const err = new Error(reason);
  err.status = 403;
  return err;
};

export const asyncRoute = (routeHandler) => (req, res, next) => {
  routeHandler(req, res, next)
    .catch(next);
};

export const controllerWrapper = (controller) => asyncRoute(async (req, res, next) => {
  const {
    query, body, params, method, url, originalUrl, user, model,
  } = req;

  const data = {
    query, body, params, method, url, originalUrl, user,
  };

  const { error, result, status } = await controller(model, data);
  if (error) return next(error);

  if (status) res.status(status);

  res.json(result);
});

export const status = {
  RESOURCE_FOUND: 200,
  RESOURCE_DELETED: 200,
  RESOURCE_UPDATED: 200,
  RESOURCE_CREATED: 201,
  RESOURCE_NOT_FOUND: 404,
};
