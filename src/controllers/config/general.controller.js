import { pool } from "../../db.js";

export const getTipoEmpresasRequest = async (req, res) => {
  try {
    const resultsFound = await pool.query(
      `SELECT * FROM settings.qry_general(operacion => 1)`
    );
    res.status(200).json(resultsFound.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
