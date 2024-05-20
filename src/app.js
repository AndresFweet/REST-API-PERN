import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
/**SECCION PARA IMPORTAR LOS ARCHIVOS ROUTES */
import securityRoutes from "./routes/security/auth.routes.js"
//rutas para el modulo de usuarios
import userRoutes from "./routes/security/users.routes.js"
//permisos por rol de usuario
import accessRoutes from "./routes/security/seccion.routes.js"
/**END SECCION PARA IMPORTAR ARCHIVOS ROUTES */
//inicializacion Express
const app = express()
//ENDPOINT DE CONEXIONENTRE BACK Y FRONT
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
//modulo para visualizar las peticiones al backend
app.use(morgan('dev'))
//mdulo para trabajar las peticiones en formato JSON
app.use(express.json())
//modulo para almacenar las cookies
app.use(cookieParser())
//seccion para utilizar las rutas importadas
app.use('/api', securityRoutes)
app.use('/api', userRoutes)
app.use('/api', accessRoutes)

export default app