import passport from 'passport';
import passportJWT from 'passport-jwt';
import model from '../model/index.js';

const { User } = model;

export { default as passport } from 'passport';
export const JWT_STRATEGY_NAME = 'jwt';
const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const { JWT_SECRET } = process.env;

const JWTStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
passport.use(new JwtStrategy(JWTStrategyOpts, User.onJWT));

passport.use(User.createStrategy()); // local strategy

export const disconnect = (req, res) => {
  req.logout();
  res.end();
};

export const registerUserLocal = async (username, password) => {
  if (!username || !password) return null;

  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Can't register user: it already exists.");

  const user = new User({ username });
  await user.setPassword(password);
  await user.save();
  return user;
};

export const authenticateLocal = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(400);
  }

  passport.authenticate('local', async (err, user) => {
    if (err) return next(err);

    let foundOrCreatedUser = user;
    if (!user) {
      const existingUser = await User.findOne({ username });
      if (existingUser) return res.sendStatus(401);

      // Create user
      foundOrCreatedUser = await registerUserLocal(req.body.username, req.body.password);
    }

    const token = await foundOrCreatedUser.createToken();
    res.json({ token });
  })(req, res, next);
};

export const authenticateFromToken = (req, res, next) => {
  passport.authenticate(JWT_STRATEGY_NAME, (err, user) => {
    if (err) {
      // eslint-disable-next-line no-param-reassign
      err.status = 401;
      return next(err);
    }

    if (user && !req.user) req.user = user;

    next();
  }, { session: false })(req, res, next);
};

export function ensureConnected(req, res, next) {
  if (!req.user) {
    const err = new Error('Unauthorized (not connected)');
    err.status = 401;
    return next(err);
  }

  next();
}
