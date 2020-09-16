import {
  Box,
  Text,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Link,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import NextLink from "next/link";

import { storeContext, setNoteView } from "../store";
import { NOTE_CREATE_VIEW, NOTE_LIST_VIEW } from "../store/constants";

const Header = () => {
  const { state, handleLogout } = useContext(storeContext);
  const router = useRouter();
  const { dispatch } = useContext(storeContext);
  const username = router.query?.username;
  const routePath = router.pathname;

  const userLogout = (e) => {
    e.preventDefault();
    handleLogout();
    router.push("/");
  };

  const getHeaderTitle = () => {
    if (routePath === "/admin") {
      return "Notes Admin";
    }
    if (routePath === "/[username]" && username) {
      return (
        state.currentUser?.username && `Notes (${state.currentUser.username})`
      );
    }
    return "Notes";
  };

  return (
    <Box width="100%" mt={[2, 5, 10]}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text
          mt="2"
          mb="3"
          fontSize="2rem"
          cursor="pointer"
          color="gray.600"
          onClick={() => dispatch(setNoteView(NOTE_LIST_VIEW))}
        >
          {getHeaderTitle()}
        </Text>
        <Flex>
          <IconButton
            onClick={() => dispatch(setNoteView(NOTE_CREATE_VIEW))}
            icon="add"
            size="lg"
            aria-label="add note"
            border="0"
            bg="pink.400"
            color="#fff"
            variantColor="pink"
            _focus={{
              outline: 0,
              bg: "pink.500",
            }}
          />
          <Menu>
            <MenuButton
              ml="2"
              px={4}
              py={2}
              transition="all 0.4s"
              rounded="md"
              borderWidth="1px"
              _hover={{ bg: "gray.200" }}
              _expanded={{ bg: "gray.200" }}
              _focus={{ outline: 0 }}
              data-testid="menu-btn-test"
            >
              <Icon name="drag-handle" />
            </MenuButton>
            <MenuList padding="0">
              {state.isAuthenticated ? (
                <React.Fragment>
                  {state.currentUser.is_admin && (
                    <MenuItem border="0">
                      <NextLink href="/admin" shallow passHref>
                        <Link
                          textDecoration="none"
                          display="block"
                          width="100%"
                          color="pink.500"
                          _focus={{
                            outline: 0,
                          }}
                          _hover={{ textDecoration: "none" }}
                        >
                          Dashboard
                        </Link>
                      </NextLink>
                    </MenuItem>
                  )}
                  <MenuItem border="0">
                    <NextLink
                      href="/[username]"
                      as={`/${state.currentUser.username}`}
                      shallow
                      passHref
                    >
                      <Link
                        textDecoration="none"
                        display="block"
                        width="100%"
                        color="pink.500"
                        _focus={{
                          outline: 0,
                        }}
                        _hover={{ textDecoration: "none" }}
                      >
                        My Notes
                      </Link>
                    </NextLink>
                  </MenuItem>
                  <MenuItem border="0" onClick={userLogout} color="pink.500">
                    Logout
                  </MenuItem>
                </React.Fragment>
              ) : (
                <MenuItem border="0">
                  <NextLink href="/login" shallow passHref>
                    <Link
                      textDecoration="none"
                      display="block"
                      width="100%"
                      color="pink.500"
                      _focus={{
                        outline: 0,
                      }}
                      _hover={{ textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </NextLink>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
