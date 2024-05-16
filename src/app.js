import express from "express";
import morgan from "morgan";
//inicializacion Express
const app = express()
//modulo para visualizar las peticiones al backend
app.use(morgan('dev'))
export default app