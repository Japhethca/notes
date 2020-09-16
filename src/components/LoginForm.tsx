import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Flex,
  Button,
  Link,
  Text,
} from "@chakra-ui/core";
import { useState, FunctionComponent } from "react";
import NextLink from "next/link";

interface LoginFormProps {
  onSubmit?: (e: any) => void;
  hasError?: boolean;
  isLoading?: boolean;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({
  onSubmit,
  hasError,
  isLoading = false,
}) => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={[4, 10]}
      >
        <NextLink href="/" shallow passHref prefetch>
          <Link
            _hover={{ textDecoration: "none" }}
            _focus={{ outline: 0 }}
            fontSize={["3xl"]}
            m="2"
            color="pink.200"
          >
            Notes
          </Link>
        </NextLink>
        <Flex
          flexDirection="column"
          bg="#fff"
          width={["95%", "55%", "40%", "25%"]}
          rounded="5px"
          padding="3"
        >
          <Heading textAlign="center" as="h4" size="lg" color="gray.500">
            User Login{" "}
          </Heading>
          {hasError && (
            <Box mb="2" color="red.400" textAlign="center">
              Invalid login credentials
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="username" color="gray.500">
                Username
              </FormLabel>
              <Input
                onChange={handleChange}
                name="username"
                type="text"
                outline="0"
                borderColor="grey"
                boxSizing="border-box"
                mb="2"
                _focus={{
                  outline: 0,
                }}
                color="gray.600"
                isInvalid={hasError}
                _invalid={{
                  borderColor: "red.500",
                }}
              />
              <FormLabel htmlFor="password" color="gray.500">
                Password
              </FormLabel>
              <Input
                onChange={handleChange}
                type="password"
                name="password"
                outline="0"
                borderColor="grey"
                boxSizing="border-box"
                mb="2"
                _focus={{
                  outline: 0,
                }}
                color="gray.600"
                isInvalid={hasError}
                _invalid={{
                  borderColor: "red.500",
                }}
              />
              <Button
                type="submit"
                isLoading={isLoading}
                border="0"
                bg="gray.400"
                color="white"
                _hover={{
                  bg: "gray.500",
                }}
              >
                Login
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LoginForm;
