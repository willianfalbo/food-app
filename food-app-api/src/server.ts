import * as jsonServer from 'json-server'
import * as path from 'path'
// import { Express } from 'express'

// import * as fs from 'fs' // file system module
// import * as https from 'https'
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const server = jsonServer.create()
const router = jsonServer.router(path.join('db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// middleware for login
server.post('/login', handleAuthentication)
// middlewares for orders
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

// const options = {
//   cert: fs.readFileSync('./backend/keys/cert.pem'),
//   key: fs.readFileSync('./backend/keys/key.pem')
// }

// "process.env.PORT" is only used when deployed to Azure
const port = process.env.PORT || 3001;
console.log('Process Env PORT:', port)

// https.createServer(options, server).listen(3001, () => {
//   console.log('JSON Server is running on https://localhost:3001')
// })

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
