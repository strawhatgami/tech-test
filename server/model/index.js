import userSchema from "./user.js";
import mongoose from 'mongoose';
const {DB__HOST, DB_NAME, DB__USER, DB__PASSWORD} = process.env;

const schemas = {
  User: userSchema,
};

export const connect = async function(){
  mongoose.set('debug', true);

  const DB_URI = "mongodb://" + DB__HOST;
  const mongo_opts = {
    dbName: DB_NAME,
    useNewUrlParser: true,
  };
  if (DB__USER) mongo_opts.user = DB__USER;
  if (DB__PASSWORD) mongo_opts.pass = DB__PASSWORD;

  await mongoose.connect(DB_URI, mongo_opts);
}

const defineModels = function(schemas){
  const model = Object.entries(schemas).reduce((models, [schema_name, schema]) => {
    const model = mongoose.model(schema_name, schema);;

    models[schema_name] = model;
    return models;
  }, {});

  return model;
}

const model = defineModels(schemas);
export default model;
