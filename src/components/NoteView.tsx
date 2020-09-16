import { useContext, FunctionComponent } from "react";
import { Box, Text, Flex } from "@chakra-ui/core";
import marked from "marked";

import { storeContext, setNoteView } from "../store";
import { NOTE_LIST_VIEW, NOTE_EDIT_VIEW } from "../store/constants";
import ActionButton from "./ActionButton";

interface NoteFormProps {
  note?: INote;
}

const NoteForm: FunctionComponent<NoteFormProps> = ({ note }) => {
  const { dispatch } = useContext(storeContext);
  return (
    <Box>
      <Text
        fontSize={["2xl", "2xl", "3xl"]}
        p={[2, 4, 6]}
        placeholder="Note Title"
        bg="white"
        mt="0"
        mb="2"
        color="gray.500"
        borderRadius="5px"
      >
        {note.title}
      </Text>
      <Text
        fontSize={["md", "xl", "xl"]}
        boxSizing="border-box"
        height="40vh"
        bg="white"
        p="2"
        mb="3"
        borderRadius="5px"
        color="gray.500"
        dangerouslySetInnerHTML={{ __html: marked(note.description) }}
      ></Text>
      <Flex>
        <ActionButton
          onClick={() => dispatch(setNoteView(NOTE_EDIT_VIEW))}
          type="submit"
          color="pink.500"
          mr="2"
          text="Edit"
        />
        <ActionButton
          onClick={() => dispatch(setNoteView(NOTE_LIST_VIEW))}
          color="gray.500"
          text="View Notes"
        />
      </Flex>
    </Box>
  );
};

export default NoteForm;
