export const asyncRoute = (routeHandler) => (req, res, next) => {
  routeHandler(req, res, next)
    .catch(next);
}
