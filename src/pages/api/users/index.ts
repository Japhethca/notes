import { NextApiResponse, NextApiRequest } from "next";

import { createUser, getUsers } from "../../../service/handlers/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      return;
    case "POST":
      await createUser(req, res);
    default:
      return res.status(405).json({
        message: "Method not implemented",
      });
  }
};
