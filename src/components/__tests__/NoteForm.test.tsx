import React from "react";

import NoteForm from "../NoteForm";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { storeContext } from "../../store";

// jest.mock('next/dynamic', () => (fn) => )
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
    const textBox = await findByRole("textbox");
    const e = container.querySelector(".DraftEditor-root");
    console.log(debug(e));
  });
});
