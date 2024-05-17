//llamado del enrutador global
import { Router } from "express";
//importando los controladores para las peticiones
import {
  signin,
  getProfileRequest,
  logOutRequest,
} from "../../controllers/security/auth.controller..js";
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA LA SECCION SEGURIDAD(LOGIN Y TOKEN) */

router.post("/security/signin", signin);

router.get("/security/profile", authRequired, getProfileRequest);

router.post("/security/logout", authRequired, logOutRequest);

//exportando las rutas de trabajo
export default router;
