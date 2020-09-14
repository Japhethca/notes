import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const getSingleNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma: PrismaClient = new PrismaClient();
  const noteId = Number.parseFloat(`${req.query.noteId}`);
  try {
    const note = await prisma.notes.findOne({ where: { id: noteId } });
    if (!note) {
      return res.status(404).json({ message: "Note note found" });
    }
    return res.status(200).json(note);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Uh Uh! Something went wrong" });
  }
};

export const updateNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma: PrismaClient = new PrismaClient();
  const { title, description } = req.body;
  const id = parseInt(`${req.query.noteId}`, 10);
  try {
    const updatedNote = await prisma.notes.update({
      where: { id },
      data: { title, description },
    });
    res.status(200).json(updatedNote);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Uh Uh! Something went wrong" });
  }
};

export const deleteNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma: PrismaClient = new PrismaClient();
  const id = Number.parseInt(`${req.query.noteId}`, 10);
  try {
    await prisma.notes.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Uh Uh! Something went wrong" });
  }
};

export const getAllNotes: NextApiHandler = async (
  _: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma: PrismaClient = new PrismaClient();
  const notes = await prisma.notes.findMany({ where: { user_id: null } });
  res.status(200).json(notes);
};

export const createNote: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const prisma: PrismaClient = new PrismaClient();
  const { description, title, user_id } = req.body;
  const data = user_id
    ? {
        description,
        title,
        users: {
          connect: {
            id: user_id,
          },
        },
      }
    : { description, title };
  try {
    const result = await prisma.notes.create({
      data,
    });
    res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Uh Uh! Something went wrong",
    });
  }
};
