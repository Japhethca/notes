import { Box, FormControl, Input, Flex } from "@chakra-ui/core";
import { useState, useContext } from "react";
import dynamic from "next/dynamic";

import client from "../api-client/client";
import { storeContext, setNoteView } from "../store";
import { getUserfromCookie } from "../libs/cookie";
import { NOTE_LIST_VIEW } from "../store/constants";
import ActionButton from "./ActionButton";

interface NoteFormProps {
  editNote?: INote;
  isEditing?: boolean;
}

const ReactRTE = dynamic(() => import("./RichEditor"), {
  ssr: false,
});

const NoteForm = ({ editNote, isEditing = false }: NoteFormProps) => {
  const { dispatch } = useContext(storeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(
    editNote ? editNote : { title: "", description: "" }
  );

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const editorChange = (value: string) => {
    setNote({ ...note, description: value });
  };

  const handleSubmit = async (note, e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = getUserfromCookie();
    let data = user ? { ...note, user_id: user.id } : note;
    if (data.id) {
      data = note.user_id ? note : data;
      await client.put(`/notes/${data.id}`, data);
      return dispatch(setNoteView(NOTE_LIST_VIEW));
    }
    await client.post("/notes", data);
    return dispatch(setNoteView(NOTE_LIST_VIEW));
  };
  return (
    <Box>
      <FormControl>
        <Input
          onChange={handleChange}
          fontSize={["2xl", "2xl", "3xl"]}
          pt={[8, 8, 10]}
          pb={[8, 8, 10]}
          border="0"
          outline="0"
          boxSizing="border-box"
          type="text"
          name="title"
          placeholder="Note Title"
          mb="2"
          focusBorderColor="#fccde2"
          value={note.title}
        />
        <ReactRTE onChange={editorChange} initialValue={note.description} />
        <Flex>
          <ActionButton
            onClick={(e) => handleSubmit(note, e)}
            type="submit"
            color="#fc5c9c"
            mr="2"
            isLoading={isLoading}
            text={isEditing ? "Update" : "Create"}
          />
          <ActionButton
            onClick={() => dispatch(setNoteView(NOTE_LIST_VIEW))}
            color="grey"
            text="Cancel"
          />
        </Flex>
      </FormControl>
    </Box>
  );
};

export default NoteForm;
