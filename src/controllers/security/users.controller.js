//importar el pool de conexion BD
import { pool } from "../../db.js";
//modulo para encriptacion de contraeñas
import bcrypt from "bcryptjs";

//controladores para el modulo de usuarios
export const createUserRequest = async (req, res) => {
  try {
    //obtener parametros del body
    const {
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      fullname,
      email,
      pass1,
      pass2,
      idRol,
      estado,
    } = req.body;
    //validar existencia de usuario por email
    const resultFound = await pool.query(
      `SELECT * FROM settings.qry_usuarios(
          operacion => $1,
          email => $2`,
      [3, email]
    );
    //validar rsultados de la busqueda
    if (resultFound.rows.lenght >= 1) {
      return res.status(400).json("Ya existe un usuario con este email...");
    }

    //validar amas passwords deben ser iguales y superior a 8 digitos
    if (pass1.lenght < 8) {
      return res
        .status(400)
        .json("La contraseña debe contar con 8 caracteres como minimo");
    }
    //validar que las contraseñas sean iguales
    if (pass1 !== pass2) {
      return res.status(400).json("Las contraseñas no coincide...");
    }

    /**CONTINUAR CON EL REGISTRO DEL USUARIO */
    //encriptar password
    const passHash = await bcrypt.hash(pass1, 10);
    return res.status(200).json("Datasaved successfully");
  } catch (error) {
    return res.status(500).json(error.response.data);
  }
};
