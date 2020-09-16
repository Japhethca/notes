import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import { storeContext, setUserView, USER_LIST_VIEW } from "../../store";
import NewUserForm from "../NewUserForm";
import client from "../../api-client/client";

const clientPost = jest.spyOn(client, "post");

const getComponent = () => {
  const store = {
    dispatch: jest.fn(),
  };
  const component = (
    <ThemeProvider>
      <storeContext.Provider value={store}>
        <NewUserForm />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { component, store };
};

describe("NewUserForm", () => {
  test("should show new user forms", () => {
    const { component } = getComponent();
    const { container } = render(component);
    const usernameInput = container.querySelector("input[name=username]");
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = container.querySelector("input[name=password]");
    expect(passwordInput).toBeInTheDocument();
  });

  test("should handle user creation", () => {
    clientPost.mockImplementationOnce(() => Promise.resolve());
    const { component } = getComponent();
    const { container, getByText } = render(component);
    const loginData = {
      username: "tester",
      password: "password",
    };
    const usernameInput = container.querySelector("input[name=username]");
    fireEvent.change(usernameInput, { target: { value: loginData.username } });
    const passwordInput = container.querySelector("input[name=password]");
    fireEvent.change(passwordInput, { target: { value: loginData.password } });
    const createBtn = getByText("Create", { exact: true });
    fireEvent.click(createBtn);
    expect(clientPost).toHaveBeenCalledWith("/users", loginData);
  });

  test("should handle user creation", async () => {
    clientPost.mockImplementationOnce(() => Promise.reject());
    const { component } = getComponent();
    const { container, getByText, findByText } = render(component);
    const createBtn = getByText("Create", { exact: true });
    fireEvent.click(createBtn);
    await findByText("Create");
  });

  test("should show user list when cancel button is clicked", () => {
    const { component, store } = getComponent();
    const { getByText } = render(component);
    fireEvent.click(getByText("Cancel"));
    expect(store.dispatch).toHaveBeenCalledWith(setUserView(USER_LIST_VIEW));
  });
});
