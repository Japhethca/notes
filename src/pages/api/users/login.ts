import { NextApiResponse, NextApiRequest } from "next";

import { userLogin } from "../../../service/handlers/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      console.log("trying to login user.....");
      await userLogin(req, res);
      return;
    default:
      return res.status(405).json({
        message: "Method not implemented",
      });
  }
};
