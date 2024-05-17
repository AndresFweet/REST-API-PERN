//importar el pool de conexion BD
import { pool } from "../../db.js";
//modulo para encriptacion de contraeñas
import bcrypt from "bcryptjs";
//modulo para manejar los token(COOKIES)
import { createAccesToken } from "../../libs/jwt.js";
//controladores para las peticiones del modulo (security)

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //ubicar usuario y su data
    const resultFound = await pool.query(
      `SELECT * FROM settings.qry_usuarios(
      operacion => $1,
      email => $2)`,
      [9, email]
    );
    //validar resultados

    if (resultFound.rows.lenght <= 0) {
      return res.status(400).json("Error de credenciales...");
    }
    //comparar pass y passHash
    const isMatch = await bcrypt.compare(
      password,
      resultFound.rows[0].qry_usuarios.password
    );
    if (!isMatch) {
      return res.status(400).json("Error de credenciales...");
    }

    //creacion token
    const token = await createAccesToken({
      id: resultFound.rows[0].qry_usuarios.id,
    });
    //establecer cookie
    res.cookie("token", token);
    res.json({
      id: resultFound.rows[0].qry_usuarios.id,
      idRol: resultFound.rows[0].qry_usuarios.id_rol,
      idEmpresa: resultFound.rows[0].qry_usuarios.id_empresa,
      email: resultFound.rows[0].qry_usuarios.email,
      firstName: resultFound.rows[0].qry_usuarios.firstname,
      firstLastName: resultFound.rows[0].qry_usuarios.firstlastname,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const logOutRequest = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
};

export const getProfileRequest = async (req, res) => {
  const userFound = await pool.query(
    `SELECT * FROM settings.qry_usuarios(
    operacion => $1,
    id_usuario => $2)`,
    [5, req.user.id]
  );

  if (!userFound) return res.status(401).json("User not found");

  return res.json({
    id: userFound.rows[0].qry_usuarios.id,
      idRol: userFound.rows[0].qry_usuarios.id_rol,
      idEmpresa: userFound.rows[0].qry_usuarios.id_empresa,
      email: userFound.rows[0].qry_usuarios.email,
      firstName: userFound.rows[0].qry_usuarios.firstname,
      firstLastName: userFound.rows[0].qry_usuarios.firstlastname
  });

};
