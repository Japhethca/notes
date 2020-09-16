import { FunctionComponent } from "react";
import { Box, Flex, Divider } from "@chakra-ui/core";

import Header from "./Header";

interface UserLayoutProps {
  children: any;
}

const UserLayout: FunctionComponent<UserLayoutProps> = ({ children }) => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Box width={["95%", "80%", "60%", "50%"]}>
        <Header />
        <Divider borderColor="pink.400" mb="4" />
        <Box width="100%">{children}</Box>
      </Box>
    </Flex>
  );
};

export default UserLayout;
