import type { NextFunction, Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await userModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, profile, email } = req.body;

    const existUsername = await userModel.findOne({
      username,
    });
    const existEmail = await userModel.findOne({
      email,
    });

    if (existUsername) {
      return res.status(400).send({ error: "Please use another username" });
    }

    if (existEmail) {
      return res.status(400).send({ error: "Please use another email" });
    }

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword: string) => {
              const newUser = new userModel({
                username: username,
                password: hashedPassword,
                profile: profile || "",
                email: email,
              });
              newUser
                .save()
                .then((result) => {
                  return res
                    .status(201)
                    .send({ success: "user register successfully" });
                })
                .catch((err) => {
                  return res.status(500).send({ err });
                });
            })
            .catch((error) => {
              return res.status(500).send({ error: "Error hashing password" });
            });
        }
      })
      .catch((error) => {
        const err = error as Error;
        res.status(500).json({ message: err.message });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    userModel
      .findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user?.password || "")
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: user?.password });

            const token = jwt.sign(
              {
                userId: user?._id,
                username: user?.username,
              },
              "secretkey",
              { expiresIn: "24h" }
            );
            return res.status(200).json({
              message: "login success",
              username: user?.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(404).send({ error: "password don't match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "user not found" });
      });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    if (!username) return res.status(404).send({ error: "invalid username" });
    const user = await userModel.findOne({ username });
    if (!user) return res.status(501).send({ error: "could not get user" });
    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(201).send({ rest });
  } catch (error) {
    return res.status(404).send({ error: "user not found" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    if (id) {
      const body = req.body;
      const user = await userModel.updateOne(
        {
          _id: id,
        },
        body
      );
      return res.status(201).send({ message: "user updated", user });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const generateOTP = async (req: Request, res: Response) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

export const verifyOTP = (req: Request, res: Response) => {
  const { code } = req.query;
  if (req.app.locals.OTP === code) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ message: "verify successfully" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
};

export const resetSession = (req: Request, res: Response) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //mengijinkan akses di route ini hanya sekali
    return res.status(201).send({ message: "access granted!" });
  }
  return res.status(440).send({ error: "Session expired!" });
};

export const resetPassword = (req: Request, res: Response) => {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });
    const { username, password } = req.body;
    try {
      userModel.findOne({ username }).then((user) => {
        bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            userModel
              .updateOne(
                { username: user?.username },
                { $set: { password: hashedPassword } }
              )
              .then(() => {
                return res
                  .status(201)
                  .send({ message: "Updated successfully" });
              })
              .catch((error) => {
                return res
                  .status(500)
                  .send({ error: "Enable to update password" });
              });
          })
          .catch((error) => {
            return res.status(500).send({ error: "Enable to hash password" });
          });
      });
    } catch (error) {
      const err = error as Error;
      return res.status(500).send({ err });
    }
  } catch (error) {
    const err = error as Error;
    return res.status(401).send({ err });
  }
};
