import { useContext, useEffect } from "react";
import { Flex, Box, Text, IconButton, Divider } from "@chakra-ui/core";

import Layout from "../components/Layout";
import UserList from "../components/UserList";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import NoteView from "../components/NoteView";
import NewUserForm from "../components/NewUserForm";
import { getUserfromCookie } from "../libs/cookie";
import { useRouter } from "next/router";
import {
  storeContext,
  setUserView,
  NOTE_EDIT_VIEW,
  NOTE_SINGLE_VIEW,
  NOTE_CREATE_VIEW,
  USER_CREATE_VIEW,
} from "../store";

const AdminHome = () => {
  const { state, dispatch } = useContext(storeContext);
  const router = useRouter();

  useEffect(() => {
    const user = getUserfromCookie();
    if (!user || !user?.is_admin) {
      router.push("/admin/login");
    }
  }, [router]);

  const renderNoteViews = () => {
    switch (state?.noteViewName) {
      case NOTE_EDIT_VIEW:
        return <NoteForm editNote={state.note} isEditing={true} />;
      case NOTE_SINGLE_VIEW:
        return <NoteView note={state.note} />;
      case NOTE_CREATE_VIEW:
        return <NoteForm />;
      default:
        return state.editedUser?.username ? (
          <Box>
            <Text
              color="grey"
              fontSize="2xl"
              mt={["5", "5", "1"]}
              mb="1"
              textTransform="capitalize"
              textAlign="center"
            >
              {state.editedUser.username} Notes
            </Text>
            <NoteList
              notesURI={
                state.editedUser?.username
                  ? `/users/${state.editedUser.username}/notes`
                  : null
              }
            />
          </Box>
        ) : (
          <NoteList notesURI={null} />
        );
    }
  };

  const renderUserViews = () => {
    switch (state?.userViewName) {
      case USER_CREATE_VIEW:
        return <NewUserForm />;
      default:
        return <UserList />;
    }
  };

  const userPanelHeader = (
    <Flex justifyContent="space-between" alignItems="center">
      <Text m="1" color="grey" fontSize="xl">
        {state.userViewName === USER_CREATE_VIEW ? "Create User" : "Note Users"}
      </Text>
      <IconButton
        icon="add"
        size="sm"
        aria-label="add note"
        border="0"
        bg="pink.400"
        mr="1"
        mt="1"
        color="#fff"
        onClick={() => dispatch(setUserView(USER_CREATE_VIEW))}
      />
    </Flex>
  );

  return (
    <Layout>
      <Flex width="100%" flexDirection={["column", "column", "row"]}>
        <Box width={["100%", "100%", "30%"]} bg="#f5f5f5" mr="2" rounded="5px">
          {userPanelHeader}
          <Divider borderColor="pink.200" />
          <Box
            height={["25vh", "18vh", "initial"]}
            overflowY={["scroll", "scroll", "inherit"]}
          >
            {renderUserViews()}
          </Box>
        </Box>
        <Box width={["100%", "100%", "70%"]}>{renderNoteViews()}</Box>
      </Flex>
    </Layout>
  );
};

export default AdminHome;
