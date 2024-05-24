//importar el pool de conexion BD
import { pool } from "../../db.js";
//controladores para las peticiones de permisos de modulos
export const createCompanyRequest = async (req, res) => {
  try {
    const {
      name,
      description,
      responsable,
      id_sector_industria,
      id_pais,
      id_departamento,
      id_ciudad,
      dirname,
      phone1,
      phone2,
      email,
      siteWeb,
      idTipoEmpresa,
      estado,
      fechaComercial,
      idTipoDocumento,
      documento,
      nit,
      idTipoLicencia,
    } = req.body;
    const id_usuario = req.user.id;
    const operacion = 2;
    //validar existencias por documento y nombre
    const resultsFound = await pool.query(
      `select * from settings.qry_empresas(
      operacion => $1,
      documento => $2,
      nombre => $3)`,
      [1, documento.name]
    );
    //evaluar resultados
    if (resultsFound.rows.length) {
      return res
        .status(409)
        .json("Ya existe una identidad con este documento y nombre...");
    }

    //insertar registro
    await pool.query(
      `SELECT * FROM settings.qry_empresas(
      operacion => $1,
      nombre => $2,
      descripcion => $3,
      responsable => $4,
      id_sector_industria => $5,
      id_pais => $6,
      id_departamento => $7,
      id_ciudad => $8,
      dirname => $9,
      phone => $10,
      phone_2 => $11,
      email => $12,
      siteWeb => $13,
      fecha_comercial => $14,
      id_tipo => $15,
      estado => $16,
      id_usuario => $17,
      id_tipo_documento => $18,
      documento => $19,
      nit => $20,
      id_tipo_licencia => $21
  )`,
      [
        operacion,
        name,
        description,
        responsable,
        id_sector_industria,
        id_pais,
        id_departamento,
        id_ciudad,
        dirname,
        phone1,
        phone2,
        email,
        siteWeb,
        fechaComercial,
        idTipoEmpresa,
        estado,
        id_usuario,
        idTipoDocumento,
        documento,
        nit,
        idTipoLicencia,
      ]
    );

    return res.status(200).json("Data saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getCompanyRequest = async (req, res) => {
  try {
    const id_empresa = req.params.id;
    const operacion = 3;

    const resultsFound = await pool.query(
      `SELECT * FROM settings.qry_empresas(
      operacion => $1,
      id_empresa => $2)`,
      [operacion, id_empresa]
    );

    if (resultsFound.rows.length >= 0) {
      res.status(404).json("No se encontraron registros...");
    }

    res.status(200).json(resultsFound.rows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateCompanyRequest = async (req, res) => {
  try {
    const {
      name,
      description,
      responsable,
      id_sector_industria,
      id_pais,
      id_departamento,
      id_ciudad,
      dirname,
      phone1,
      phone2,
      email,
      siteWeb,
      idTipoEmpresa,
      estado,
      fechaComercial,
      idTipoDocumento,
      documento,
      nit,
      idTipoLicencia,
    } = req.body;
    const operacion = 5;
    const id_usuario = req.user.id;
  
    //actualiza registro
    await pool.query(
      `SELECT * FROM settings.qry_empresas(
      operacion => $1,
      nombre => $2,
      descripcion => $3,
      responsable => $4,
      id_sector_industria => $5,
      id_pais => $6,
      id_departamento => $7,
      id_ciudad => $8,
      dirname => $9,
      phone => $10,
      phone_2 => $11,
      email => $12,
      siteWeb => $13,
      id_tipo => $15,
      estado => $16,
      fecha_comercial => $18,
      id_usuario => $19,
      id_tipo_licencia => $20,
      id_empresa => $21
  )`,
      [
        operacion,
        name,
        description,
        responsable,
        id_sector_industria,
        id_pais,
        id_departamento,
        id_ciudad,
        dirname,
        phone1,
        phone2,
        email,
        siteWeb,
        idTipoEmpresa,
        estado,
        fechaComercial,
        id_usuario,
        idTipoLicencia,
        id_empresa
      ]
    );
  
    return res.status(200).json("Data saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
