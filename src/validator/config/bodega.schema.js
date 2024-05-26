import { z } from "zod";

export const createBodegaSchema = z.object({
    idStore: z
    .number({
        required_error : "idStore is required"
    }),
        
    name: z
    .string({
        required_error : "name is required"
    }),
    descripcion : z
    .string()
    .optional(),
    
    dirname: z
    .string({
        required_error : "dirname is required"
    }),

    idTipoBodega: z
    .number({
        required_error : "idTipoBodega is required"
    }),

    isActive: z
    .boolean({
        required_error : "isActive is required"
    }),

    idPais : z
    .number({
        required_error : "idPais is required"
    }),

    idDepartamento: z
    .number({
        required_error : "idDepartamento is required"
    }),

    idCiudad: z
    .number({
        required_error : "idCiudad is required"
    })

})