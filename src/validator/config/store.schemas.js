import { z } from 'zod'

export const createStoreSchema = z.object({
    name: z
    .string({
      required_error: "Name is required",
    }),
    
    descripcion : z
    .string()
    .optional(),

    idPais : z
    .number({
        required_error: "idPais is required"
    }),

    idDepartamento : z
    .number({
        required_error: "idDepartamento is required"
    }),

    idCiudad : z
    .number({
        required_error: "idCiudad is required"
    }),

    dirname: z
    .string({
        required_error: "dirname is required"
    }),

    phone: z
    .number({
        required_error : "phone is required"
    }),

    phone2: z
    .number()
    .optional(),

    idTipoStore: z
    .number({
        required_error : "idTipoStore is required"
    }),


    email: z
    .string({
        required_error : "email is required"
    })
    .email({
        required_error: "email is not valid"
    }),
    
    imageLogo: z
    .instanceof(Buffer)
    .optional(),

    isActive: z
    .boolean({
        required_error : "isActive is required"
    }),

    dateCommerical : z
    .date({
        required_error : "dateCommercial is required"
    })

})