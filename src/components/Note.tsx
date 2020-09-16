import { FunctionComponent } from "react";
import { Flex, Link, IconButton } from "@chakra-ui/core";

interface NoteProps {
  note: INote;
  handleEdit?: (n: INote, e) => void;
  handleDelete?: (n: INote, e) => void;
  onClick?: (n: INote) => void;
  isDeleting?: { state: boolean; noteId: number };
}

const Note: FunctionComponent<NoteProps> = ({
  note,
  handleEdit,
  handleDelete,
  onClick,
  isDeleting,
}) => (
  <Flex
    key={`${note.id}-${note.title}`}
    width="100%"
    bg="#f5f5f5"
    p="1"
    mb="2"
    borderRadius="5px"
    alignItems="center"
    justifyContent="space-between"
  >
    <Link
      onClick={() => onClick(note)}
      color="pink.500"
      fontSize={["1em", "1.2em"]}
      cursor="pointer"
      _hover={{
        textDecoration: "none",
        color: "pink.700",
      }}
    >
      {note.title || "[No Title]"}
    </Link>
    <Flex>
      <IconButton
        onClick={(e) => handleEdit(note, e)}
        color="gray.500"
        aria-label="edit note"
        icon="edit"
        border="0"
        mr="1"
        _hover={{
          color: "gray.700",
        }}
      />
      <IconButton
        isLoading={isDeleting.state}
        onClick={(e) => handleDelete(note, e)}
        color="gray.500"
        aria-label="delete note"
        icon="delete"
        border="0"
        _hover={{
          color: "gray.700",
        }}
      />
    </Flex>
  </Flex>
);

export default Note;
