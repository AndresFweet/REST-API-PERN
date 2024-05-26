import { Router } from "express";
//importando los controladores de las peticiones
import {
  createStoreRequest,
  getBodegaRequest,
  udpateBodegaRequest,
} from "../../controllers/config/bodega.controller.js";
//importar modulo encargado de validar token
import { authRequired } from "../../middlewares/validateToken.js";
//importando modulo encargado de validar los schemas
import { validateSchema } from "../../middlewares/validateSchema.js";
//importando schemas de validacion
import { createBodegaSchema } from "../../validator/config/bodega.schema.js";
//ejecucion del enrutador para las peticiones
const router = Router();

/**RUTAS PARA EL MODULO DE BODEGAS (CRUD) */

router.post(
  "/config/createBodega",
  authRequired,
  validateSchema(createBodegaSchema),
  createStoreRequest
);

router.get("/config/getBodega/:id", authRequired, getBodegaRequest);

router.put(
  "/config/updateBodega/:id",
  authRequired,
  validateSchema(createBodegaSchema),
  udpateBodegaRequest
);

export default router;
