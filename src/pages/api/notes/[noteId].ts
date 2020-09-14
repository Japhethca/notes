import { NextApiRequest, NextApiResponse } from "next";

import {
  getSingleNote,
  updateNote,
  deleteNote,
} from "../../../service/handlers/notes";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getSingleNote(req, res);
      return;
    case "PUT":
      await updateNote(req, res);
      return;
    case "DELETE":
      await deleteNote(req, res);
      return;
    default:
      return res
        .status(405)
        .json({ message: "Method not implemented for this route" });
  }
};
