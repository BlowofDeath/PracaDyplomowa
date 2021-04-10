import jwt from "jsonwebtoken";
import { JWT_HASH } from "../configs/environment";

const signJWT = (obj, expire = "2d") =>
  jwt.sign(obj, JWT_HASH, {
    expiresIn: expire,
  });

const verifyJWT = (token, callback = undefined) =>
  jwt.verify(token, JWT_HASH, callback);

export { signJWT, verifyJWT };
