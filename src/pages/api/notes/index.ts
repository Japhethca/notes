import { NextApiRequest, NextApiResponse } from "next";

import { getAllNotes, createNote } from "../../../service/handlers/notes";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getAllNotes(req, res);
      return;
    case "POST":
      await createNote(req, res);
      return;
    default:
      return res.status(405).json({ message: "Method not implemented" });
  }
};
