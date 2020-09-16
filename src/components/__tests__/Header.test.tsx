import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { render, fireEvent } from "@testing-library/react";

import Header from "../Header";
import {
  storeContext,
  setNoteView,
  NOTE_CREATE_VIEW,
  NOTE_LIST_VIEW,
} from "../../store";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
const mockUseRouter = (props: { pathname?: string; query?: any; push?: any }) =>
  useRouter.mockImplementationOnce(() => ({
    ...props,
  }));

const getComponent = ({ stateValues = {}, routerProps = {} } = {}) => {
  mockUseRouter({
    query: { username: "tester" },
    pathname: "/",
    ...routerProps,
  });
  const store = {
    handleLogout: jest.fn(),
    dispatch: jest.fn(),
    state: {
      currentUser: {
        username: "tester",
      },
      ...stateValues,
    },
  };

  const component = (
    <ThemeProvider>
      <storeContext.Provider value={store}>
        <Header />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { component, store };
};

describe("Header", () => {
  test("should display header text for anonymous user", () => {
    const { component } = getComponent();
    const { getByText } = render(component);
    const headerText = getByText("Notes");
    expect(headerText).toBeInTheDocument();
  });

  test("should display header text for user", () => {
    const stateValues = {
      currentUser: {
        username: "tester",
      },
      isAuthenticated: true,
    };
    const routerProps = {
      query: { username: "tester" },
      pathname: "/[username]",
    };
    const { component } = getComponent({ stateValues, routerProps });
    const { getByText } = render(component);
    const headerText = getByText(
      `Notes (${stateValues.currentUser.username})`,
      { exact: true }
    );
    expect(headerText).toBeInTheDocument();
  });

  test("should display header text for admin user", () => {
    const routerProps = {
      pathname: "/admin",
    };
    const { component } = getComponent({ routerProps });
    const { getByText } = render(component);
    const headerText = getByText("Notes Admin", { exact: true });
    expect(headerText).toBeInTheDocument();
  });

  test("should show add note button", () => {
    const { component } = getComponent();
    const { getByLabelText } = render(component);
    const btn = getByLabelText("add note");
    expect(btn).toBeInTheDocument();
  });

  test("should show note list when header title is clicked", () => {
    const { component, store } = getComponent();
    const { getByText } = render(component);
    const headerText = getByText("Notes");
    fireEvent.click(headerText);
    expect(store.dispatch).toHaveBeenCalledWith(setNoteView(NOTE_LIST_VIEW));
  });

  test("should show create note view when add note is clicked", () => {
    const { component, store } = getComponent();
    const { getByLabelText } = render(component);
    fireEvent.click(getByLabelText("add note"));
    expect(store.dispatch).toHaveBeenCalledWith(setNoteView(NOTE_CREATE_VIEW));
  });

  test("should show login button", () => {
    const { component } = getComponent();
    const { getByTestId, getByText } = render(component);
    const menuBtn = getByTestId("menu-btn-test");
    fireEvent.click(menuBtn);
    const loginbtn = getByText(/login/i);
    expect(loginbtn).toBeInTheDocument();
  });

  test("should handle user logout", () => {
    const stateValues = {
      currentUser: {
        username: "tester",
        is_admin: true,
      },
      isAuthenticated: true,
    };
    const routerProps = {
      query: { username: "tester" },
      pathname: "/[username]",
      push: jest.fn(),
    };
    const { component } = getComponent({ stateValues, routerProps });
    const { getByTestId, getByText } = render(component);
    fireEvent.click(getByTestId("menu-btn-test"));
    expect(getByText(/dashboard/i)).toBeInTheDocument();

    const logoutBtn = getByText(/logout/i);
    fireEvent.click(logoutBtn);
    expect(routerProps.push).toHaveBeenCalledWith("/");
  });
});
