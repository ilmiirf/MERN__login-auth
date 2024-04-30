import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user: any;
}

const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqAuth = req as AuthRequest;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token Not Found" });
    const decodedToken = await jwt.verify(token, "secretkey");
    reqAuth.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication Failed" });
  }
};

export const localVariable = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

export default Auth;
