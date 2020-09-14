import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

import { adminLogin } from "../../../../service/handlers/users";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await adminLogin(req, res);
      return;
    default:
      return res.status(405).json({
        message: "Method not implmented",
      });
  }
};
