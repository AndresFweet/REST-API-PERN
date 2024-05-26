import { pool } from "../../db";

export const createStoreRequest = async (req, res) => {
  try {
    //req.body
    const {
      idStore,
      name,
      descripcion,
      dirname,
      idTipoBodega,
      isActive,
      idPais,
      idDepartamento,
      idCiudad,
    } = req.bdy;
    //validacion de existencia por empresa y tienda
    const resultFound = await pool.query(
      `SELECT * FROM settings.qry_bodegas(
            operacion => $1,
            id_empresa => $2,
            id_store => $3,
            nombre => $4)`,
      [3, req.user.idEmpresa, idStore, name]
    );

    //validar resultados
    if (resultFound.rows.length > 0)
      return res.status(409).json("Ya existe una bodega con este nombre...");

    //insertar registro
    await pool.query(
      `SELECT * FROM settings.qry_bodegas(
		operacion => $1,
		id_empresa => $2,
		id_store => $3,
		nombre => $4,
		description => $5,
		dirname => $6,
		id_tipo => $7,
		estado => $8,
		id_usuario => $9,
		id_pais => $10,
		id_departamento => $11,
		id_ciudad => $12)`,
      [
        4,
        req.user.idEmpresa,
        idStore,
        name,
        descripcion,
        dirname,
        idTipoBodega,
        isActive,
        idPais,
        idDepartamento,
        idCiudad,
      ]
    );

    return res.status(200).json("Data saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getBodegaRequest = async (req, res) => {
  try {
    //realizar busqueda por id
    const resultsFund = await pool.query(
      `SELECT * FROM settings.qry_bodegas(
		operacion => $1,
		id_empresa => $2,
		id_bodega => $3)`,
      [6, req.user.idEmpresa, req.params.id]
    );
    //validar resultados
    if (resultsFund.rows.length <= 0)
      return res.status(404).json("Registro no encontrado...");

    return res.status(200).json(resultsFund.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const udpateBodegaRequest = async (req, res) => {
  try {
    //req body
    const {
      idStore,
      name,
      descripcion,
      dirname,
      idTipoBodega,
      isActive,
      idPais,
      idDepartamento,
      idCiudad,
    } = req.bdy;
    //actualizar registro
    await pool.query(
      `SELECT * FROM settings.qry_bodegas(
		operacion => $1,
		id_empresa => $2,
		id_bodega => $3,
		nombre => $4,
		description => $5,
		dirname => $6,
		id_tipo => $7,
		estado => $8,
		id_usuario => $9,
		id_pais => $10,
		id_departamento => $11,
		id_ciudad => $12)`,
      [
        7,
        req.user.idEmpresa,
        req.params.id,
        name,
        descripcion,
        dirname,
        idTipoBodega,
        isActive,
        req.user.id,
        idPais,
        idDepartamento,
        idCiudad,
      ]
    );

    return res.status(200).json("Data updated successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
