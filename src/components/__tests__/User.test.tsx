import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import User from "../User";
import { storeContext, setEditedUser } from "../../store";

describe("User", () => {
  test("should render user detail", () => {
    const user = {
      username: "tester",
    };
    const store = {
      dispatch: jest.fn(),
    };
    const component = (
      <ThemeProvider>
        <storeContext.Provider value={store}>
          <User user={user} />
        </storeContext.Provider>
      </ThemeProvider>
    );
    const { getByText } = render(component);
    const usernameText = getByText(user.username);
    expect(usernameText).toBeInTheDocument();
    fireEvent.click(usernameText);
    expect(store.dispatch).toHaveBeenCalledWith(setEditedUser(user));
  });
});
