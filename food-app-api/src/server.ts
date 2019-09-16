import * as jsonServer from "json-server";
import * as path from "path";
// import { Express } from "express"

// import * as fs from "fs" // file system module
// import * as https from "https"
import { handleAuthentication } from "./auth";
import { handleAuthorization } from "./authz";
import { handleRegistration } from "./register";

const server: any = jsonServer.create();
const router: any = jsonServer.router(path.join("db.json"));
const middlewares: any = jsonServer.defaults();

// set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// to handle POST, PUT and PATCH you need to use a body-parser
// you can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// middleware for login
server.post("/login", handleAuthentication);
// middlewares for orders
server.use("/orders", handleAuthorization);

server.post("/users", handleRegistration);

// use default router
server.use(router);

// const options = {
//   cert: fs.readFileSync("./backend/keys/cert.pem"),
//   key: fs.readFileSync("./backend/keys/key.pem")
// }

// "process.env.PORT" is only used when deployed to Azure
const port: any = process.env.PORT || 3001;
console.log("Process Env PORT:", port);

// https.createServer(options, server).listen(3001, () => {
//   console.log("JSON Server is running on https://localhost:3001")
// })

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
})
