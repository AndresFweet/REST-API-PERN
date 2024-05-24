import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { pool } from "../db.js";

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  let id_usuario;

  if (!token) return res.status(401).json("No token, authorization denied");

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid Token");

    id_usuario = user.id;

    
  });

  const userFound = await pool.query(
    `SELECT * FROM settings.qry_usuarios(
    operacion => $1,
    id_usuario => $2)`,
    [5, id_usuario]
  );

  req.user = {
    id: userFound.rows[0].qry_usuarios.id,
    idRol: userFound.rows[0].qry_usuarios.id_rol,
    idEmpresa: userFound.rows[0].qry_usuarios.id_empresa,
    email: userFound.rows[0].qry_usuarios.email,
    firstName: userFound.rows[0].qry_usuarios.firstname,
    firstLastName: userFound.rows[0].qry_usuarios.firstlastname,
  };

  next();

};
