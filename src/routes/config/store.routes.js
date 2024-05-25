import { Router } from "express";
//importando los controladores de peticiones
import { createStoreRequest, getStoreRequest, updateStoreRequest } from "../../controllers/config/store.controller.js";
//importando el modulo de validar el token
import { authRequired } from "../../middlewares/validateToken.js";
//importar el modlo encargado de validar schemas
import { validateSchema } from "../../middlewares/validateSchema.js";
//importando schemas
import { createStoreSchema } from "../../validator/config/store.schemas.js";
//ejecucion del enrutador de peticiones
const router = Router();

/**RUTAS PARA EL CRUD DEL MODULO STORES */
router.post(
  "/config/createStore",
  authRequired,
  validateSchema(createStoreSchema),
  createStoreRequest
);

router.get("/config/getStore/:id", authRequired, getStoreRequest)

router.put("/config/updateStore/:id", authRequired, validateSchema(createStoreSchema), updateStoreRequest)

export default router;
