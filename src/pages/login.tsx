import { useState, useContext } from "react";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import client from "../api-client/client";
import { setAuthToken } from "../libs/cookie";
import { storeContext } from "../store";

const UserLogin = () => {
  const { handleLogin } = useContext(storeContext);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (userData: NoteUser) => {
    if (!userData.username || !userData.password) {
      setHasError(true);
      return;
    }
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await client.post("/users/login", userData);
      const { token, user } = res.data;
      setAuthToken(token);
      handleLogin(user);
      if (user.is_admin) {
        router.push("/admin");
        return;
      }
      router.push("/[username]", `/${user.username}`, {
        shallow: true,
      });
    } catch (err) {
      setIsLoading(false);
      setHasError(true);
    }
  };
  return (
    <LoginForm onSubmit={onSubmit} hasError={hasError} isLoading={isLoading} />
  );
};

export default UserLogin;
