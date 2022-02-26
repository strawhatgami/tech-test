import {connect} from "./model/index.js";

export default async () => {
  await connect();
  console.log("Connected to Mongoose.");

  console.log("App initialisation OK");
};
