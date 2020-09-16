import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import { storeContext } from "../../store";

import LoginForm from "../LoginForm";

const getComponent = (otherProps?: {
  hasError?: boolean;
  isLoading?: boolean;
}) => {
  const loginFormProps = {
    onSubmit: jest.fn(),
    ...otherProps,
  };
  const storeValue = {
    state: {
      isAuthenticated: false,
    },
  };
  const component = (
    <ThemeProvider>
      <storeContext.Provider value={storeValue}>
        <LoginForm {...loginFormProps} />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { component, loginFormProps };
};

describe("LoginForm", () => {
  test("should show notes home link", () => {
    const { component } = getComponent();
    const { getByText } = render(component);
    expect(getByText(/notes/i)).toBeInTheDocument();
  });

  test("should handle user login", () => {
    const { component, loginFormProps } = getComponent();
    const { container, getByText, debug } = render(component);
    const loginData = {
      username: "tester",
      password: "password",
    };
    const usernameInput = container.querySelector("input[name=username]");
    fireEvent.change(usernameInput, { target: { value: loginData.username } });
    const passwordInput = container.querySelector("input[name=password]");
    fireEvent.change(passwordInput, { target: { value: loginData.password } });
    const loginBtn = getByText("Login", { exact: true });
    fireEvent.click(loginBtn);
    expect(loginFormProps.onSubmit).toHaveBeenCalledWith(loginData);
  });

  test("should show login error message", () => {
    const { component } = getComponent({ hasError: true });
    const { getByText } = render(component);
    expect(getByText(/invalid login credentials/i)).toBeInTheDocument();
  });
});
