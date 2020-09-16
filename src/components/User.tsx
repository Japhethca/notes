import { Text, Link } from "@chakra-ui/core";
import { useContext, FunctionComponent } from "react";
import { storeContext, setEditedUser } from "../store";

interface UserProps {
  user: NoteUser;
}

const User: FunctionComponent<UserProps> = ({ user }) => {
  const { dispatch } = useContext(storeContext);

  const handleClick = () => {
    dispatch(setEditedUser(user));
  };

  return (
    <Link
      pl="1"
      pr="2"
      m="0"
      pt="2"
      pb="2"
      display="block"
      _hover={{
        bg: "#f0f0f0",
      }}
      cursor="pointer"
      color="#fc5c9c"
      fontSize="1xl"
      textTransform="capitalize"
      onClick={handleClick}
    >
      {user.username}
    </Link>
  );
};

export default User;
