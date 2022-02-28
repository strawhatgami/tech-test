import AutoIncrementFactory from 'mongoose-sequence';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import passportLocalMongoose from 'passport-local-mongoose';
import path from 'path';
import { names } from './associations.js';

const filename = path.basename(import.meta.url);
export const name = names[filename];

const AutoIncrement = AutoIncrementFactory(mongoose);
const { Schema } = mongoose;
const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

const schema = new Schema({
  _id: Number,
}, { _id: false });

const numericDateFromDate = (date) => parseInt(date.getTime() / 1000, 10);
schema.methods.createToken = async function () {
  return new Promise((resolve) => {
    const { id } = this;

    const now = new Date();
    const payload = {
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      sub: id,
      iat: numericDateFromDate(now),
    };

    jwt.sign(payload, JWT_SECRET, {}, (err, token) => {
      if (err) throw err;

      resolve(token);
    });
  });
};

schema.statics.onJWT = async (jwtPayload, done) => {
  let user = null;
  try {
    user = await model.getUserFromToken(jwtPayload);
  } catch (e) {
    done(e);
    return;
  }

  done(null, user);
};

schema.statics.getUserFromToken = async (jwtPayload) => {
  const user = await model.findOne({
    id: jwtPayload.sub,
  });

  return user;
};

schema.index({ username: 1 }, { unique: true });
schema.plugin(passportLocalMongoose, {
  usernameField: 'username',
  usernameUnique: true,
  limitAttempts: true,
});
schema.plugin(AutoIncrement, { id: 'user_id_counter', inc_field: '_id' });

const model = mongoose.model(name, schema);

export default model;
