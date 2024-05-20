import { Router } from "express";
//importando los controladores para las peticiones
import {getSeccionRequest, getItemsRequest} from '../../controllers/security/seccionController.js'
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA LA SECCION SEGURIDAD(SECCIONES E ITEMS) */

router.get("/security/getSeccions", authRequired, getSeccionRequest);

router.get("/security/getItems", authRequired, getItemsRequest);


export default router
