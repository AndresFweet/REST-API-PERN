import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
//funcion que permite validar el token
//con el objetivo de proteger las rutas
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  //validar TOKEN
  if (!token) return res.status(401).json("No Token, Authorization denied");
  //verficar token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    
    req.user = user

    next();
  });
};
