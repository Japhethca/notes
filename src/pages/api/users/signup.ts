import { NextApiResponse, NextApiRequest } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    default:
      return res.json({
        message: "Method not implemented",
      });
  }
};
