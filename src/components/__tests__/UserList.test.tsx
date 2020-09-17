import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { render } from "@testing-library/react";

import client from "../../api-client/client";
import UserList from "../UserList";

const clientGet = jest.spyOn(client, "get");

const getComponent = () => {
  const component = (
    <ThemeProvider>
      <UserList />
    </ThemeProvider>
  );
  return { component };
};

describe("UserList", () => {
  test("should render user list", async () => {
    const users = [
      {
        username: "tester",
      },
    ];
    clientGet.mockReturnValueOnce(Promise.resolve({ data: users }));
    const { component } = getComponent();
    const { findByText } = render(component);
    await findByText(users[0].username);
  });

  //   test("should render no users if user list is empty", async () => {
  //     clientGet.mockReturnValueOnce(Promise.resolve(null));
  //     const { component } = getComponent();
  //     const { findByText } = render(component);
  //     await findByText(/no users yet/i);
  //   });
});
