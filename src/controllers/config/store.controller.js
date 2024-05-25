//importar conexion BD
import { pool } from "../../db.js";
//controladores para el crud del moculo (STORE)
export const createStoreRequest = async (req, res) => {
  try {
    //REQ BODY
    const {
      name,
      descripcion,
      idPais,
      idDepartamento,
      idCiudad,
      dirname,
      phone,
      phone2,
      idTipoStore,
      email,
      imageLogo,
      isActive,
      dateCommerical,
    } = req.body;
    const operacion = 4;
    //validar existencias de tienda por nombre y ciudad
    const resultsFund = await pool.query(
      `SELECT* FROM settings.qry_stores(
		operacion => $1,
		id_empresa => $2,
		id_municipio => $3,
		nombre => $4)`,
      [3, req.user.idEmpresa, idCiudad, name]
    );
    //validar los resulados encontrados
    if (resultsFund.rows.length > 0)
      return res
        .status(409)
        .json("Ya existe un tienda con estas caracteristicas");

    //insertar nuevo registro
    await pool.query(
      `SELECT* FROM settings.qry_stores(
		operacion => $1,
		id_empresa => $2,
		nombre => $3,
		descripcion => $4,
		id_pais => $5,
		id_departamento => $6,
		id_municipio => $7,
		direccion => $8,
		phone => $9,
		phone2 => $10,
		id_tipo => $11,
		email => $12,
		logo => $13,
		estado => $14,
		id_usuario => $15,
		fecha_comercial => $16)`,
      [
        operacion,
        req.user.idEmpresa,
        name,
        descripcion,
        idPais,
        idDepartamento,
        idCiudad,
        dirname,
        phone,
        phone2,
        idTipoStore,
        email,
        imageLogo,
        isActive,
        req.user.id,
        dateCommerical,
      ]
    );

    return res.status(200).json("Data saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getStoreRequest = async (req, res) => {
  try {
    const operacion = 2;
    const id_store = req.params.id;
    //realizar busqueda por id
    const resultsFund = await pool.query(
      `SELECT* FROM settings.qry_stores(
      operacion => $1,
      id_empresa => $2,
      id_store => $3)`,
      [operacion, req.user.idEmpresa, id_store]
    );
    //validar resultados
    if (resultsFund.rows.length <= 0)
      res.status(404).json("No se econtro el registro");

    return res.status(200).json(resultsFund.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateStoreRequest = async (req, res) => {
  try {
    //REQ BODY
    const {
      name,
      descripcion,
      idPais,
      idDepartamento,
      idCiudad,
      dirname,
      phone,
      phone2,
      idTipoStore,
      email,
      imageLogo,
      isActive,
      dateCommerical,
    } = req.body;
    const operacion = 5;
    const idStore = req.params.id;

    //actualizar registro
    await pool.query(
      `SELECT* FROM settings.qry_stores(
      operacion => $1,
      id_store => $2,
      nombre => $3,
      descripcion => $4,
      id_pais => $5,
      id_departamento => $6,
      id_municipio => $7,
      direccion => $8,
      phone => $9,
      phone2 => $10,
      id_tipo => $11,
      email => $12,
      logo => $13,
      estado => $14,
      id_usuario => $15,
      fecha_comercial => $16)`,
      [
        operacion,
        idStore,
        name,
        descripcion,
        idPais,
        idDepartamento,
        idCiudad,
        dirname,
        phone,
        phone2,
        idTipoStore,
        email,
        imageLogo,
        isActive,
        req.user.id,
        dateCommerical,
      ]
    );

    return res.status(200).json("Data updated successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
