import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { render } from "@testing-library/react";

import NoteForm from "../NoteForm";
import { storeContext } from "../../store";

const getComponent = () => {
  const store = {
    dispatch: jest.fn(),
  };
  const component = (
    <ThemeProvider>
      <storeContext.Provider value={store}>
        <NoteForm />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { component, store };
};

describe("NoteForm", () => {
  test("should render forms", async () => {
    const { component } = getComponent();
    const { getByPlaceholderText, debug, findByRole, container } = render(
      component
    );
    expect(getByPlaceholderText(/note title/i)).toBeInTheDocument;
    await findByRole("textbox");
  });
});
