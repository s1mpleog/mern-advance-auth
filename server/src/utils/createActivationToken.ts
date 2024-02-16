import { IActivationToken } from "../@types/types";
import jwt, { Secret } from "jsonwebtoken";

const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

export default createActivationToken;
