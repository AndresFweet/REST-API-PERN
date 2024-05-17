//llamado del enrutador global
import { Router } from "express";
//importando los controladores para las peticiones
import { createUserRequest } from "../../controllers/security/users.controller.js"
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//ejecucion del enrutador para las peticiones
const router = Router();

router.post("/security/createUser", authRequired, createUserRequest)

//exportando las rutas de trabajo
export default router;