import { NextApiRequest, NextApiResponse } from "next";

import { getUserNotes } from "../../../../service/handlers/users";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getUserNotes(req, res);
    default:
      return res.status(405).json({
        message: "Method not implemented",
      });
  }
};
