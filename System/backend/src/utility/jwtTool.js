import jwt from "jsonwebtoken";

const signJWT = (obj) =>
  jwt.sign(obj, process.env.JWT_HASH, {
    expiresIn: "2d",
  });

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_HASH);

export { signJWT, verifyJWT };
