import { Router } from "express";
//importando los controladores para las peticiones
import {searchDynamicsRequest} from '../../controllers/other/search.controller.js'
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA LAS BUSQUEDAS GENERALES*/

router.post("/config/searchDynamics", authRequired, searchDynamicsRequest)

export default router
