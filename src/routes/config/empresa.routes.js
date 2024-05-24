import { Router } from "express";
//importando los controladores para las peticiones
import {
  createCompanyRequest,
  getCompanyRequest,
  updateCompanyRequest,
} from "../../controllers/config/company.controllers.js";
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA LA SECCION SEGURIDAD(SECCIONES E ITEMS) */

router.post("/config/createCompany", authRequired, createCompanyRequest);

router.get("/config/getCompany/:id", authRequired, getCompanyRequest);

router.put("/config/updateCompany/:id", authRequired, updateCompanyRequest);

export default router;
