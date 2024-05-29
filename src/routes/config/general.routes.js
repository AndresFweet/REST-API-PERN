import { Router } from "express";
//importando los controladores de las peticiones
import {getTipoEmpresasRequest} from '../../controllers/config/general.controller.js'
//importar modulo encargado de validar token
import {authRequired} from '../../middlewares/validateToken.js'
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA EL LAS PETICIONES DE DATOS GENERALES(TABLAS DE REFERENCIA) */

router.get("/config/getTipoEmpresa", authRequired, getTipoEmpresasRequest)

export default router
