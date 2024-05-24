import { pool } from "../../db"

export const searchDynamicsRequest = async (req, res) => {
    try {
        const id_usuario = req.user.id
        const id_empresa = req.user.idEmpresa
        const id_rol = req.user.idRol
        //REQUEST BODY
        const {functionBD, operacion, data} = req.body
        //realizar busqueda
        const resultsFound = await pool.query(`SELECT * FROM ${functionBD} (
            operacion => $1,
            id_empresa => $2,
            id_usuario => $4
        )`, [operacion, id_empresa, id_usuario])
        //validar resultados
        if (resultsFound.rows.length <= 0) {
            res.status(404).json('No se encontraron resultados...')
        }
        res.status(200).json(resultsFound.rows)

    } catch (error) {
        return res.status(500).json(error.message);
    }
}