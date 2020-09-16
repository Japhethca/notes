import { NextApiResponse, NextApiHandler, NextApiRequest } from "next";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { toLower } from "../helpers";

const SALT = 10;

export const createUser: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma = new PrismaClient();
  const { username, password } = req.body;

  const userExist = await prisma.users.findOne({
    where: { username: toLower(username) },
  });
  if (userExist) {
    return res
      .status(409)
      .json({ message: "User with credentials already exists" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const user = await prisma.users.create({
      data: {
        username: toLower(username),
        password: hashedPassword,
      },
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Uh Uh! Something went wrong" });
  }
};

export const getUsers: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma = new PrismaClient();
  const users = await prisma.users.findMany({ include: { notes: true } });
  return res.status(200).json(users);
};

export const userLogin: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma = new PrismaClient();
  const { username, password } = req.body;
  const user = await prisma.users.findOne({
    where: { username: toLower(username) },
  });
  if (!bcrypt.compareSync(password, user?.password || "")) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
  const token = jwt.sign(
    {
      user: { username: user?.username, id: user?.id, is_admin: user.is_admin },
    },
    process.env?.SECRET_KEY || ""
  );
  return res.status(200).json({ message: "success", user, token });
};

export const getUserNotes: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma = new PrismaClient();
  const { username } = req.query;
  const user = await prisma.users.findOne({
    where: { username: toLower(`${username}`) },
    include: { notes: true },
  });
  if (!user) {
    return res.status(404).json({ message: "username does not exist" });
  }
  res.status(200).json(user.notes);
};

export const adminLogin: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma = new PrismaClient();
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASSWORD;
  console.log(adminPass, adminUser, ">>>>>>>>>>");
  if (username === adminUser && password === adminPass) {
    let user = await prisma.users.findOne({
      where: { username: toLower(username) },
    });
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, SALT);
      user = await prisma.users.create({
        data: {
          username: toLower(username),
          password: hashedPassword,
          is_admin: true,
        },
      });
    }
    const token = jwt.sign(
      {
        user: { id: user.id, username: user.username, is_admin: user.is_admin },
      },
      process.env.SECRET_KEY || ""
    );
    return res.status(200).json({
      message: "successful",
      user,
      token,
    });
  }
  return res.status(401).json({
    message: "Hmmm... It seems you are not an admin user",
  });
};
