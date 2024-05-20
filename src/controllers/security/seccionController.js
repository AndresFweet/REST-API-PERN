//importar el pool de conexion BD
import { pool } from "../../db.js";
//controladores para las peticiones de permisos de modulos
export const getSeccionRequest = async (req, res) => {
  try {
    const operacion = 1;
    const resultsFound = await pool.query(
      `SELECT * FROM security.qry_seccions_items(
		operacion => $1)`,
      [operacion]
    );
    //validar respuesta
    if (resultsFound.rows.length <= 0) {
      return res
        .status(400)
        .json("No se encontraron permisos para el usuaio...");
    }
    return res.status(200).json(resultsFound.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getItemsRequest = async (req, res) => {
    try {
        const operacion = 2;
        const resultsFound = await pool.query(
          `SELECT * FROM security.qry_seccions_items(
            operacion => $1)`,
          [operacion]
        );
        //validar respuesta
        if (resultsFound.rows.length <= 0) {
          return res
            .status(400)
            .json("No se encontraron permisos para el usuaio...");
        }
        return res.status(200).json(resultsFound.rows);
      } catch (error) {
        return res.status(500).json(error.message);
      }   
}
