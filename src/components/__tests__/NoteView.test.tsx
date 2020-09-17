import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import NoteView from "../NoteView";
import {
  storeContext,
  setNoteView,
  NOTE_EDIT_VIEW,
  NOTE_LIST_VIEW,
} from "../../store";

const getComponent = () => {
  const store = {
    dispatch: jest.fn(),
  };
  const note = {
    id: 1,
    title: "note title",
    description: "note description",
  };
  const component = (
    <ThemeProvider>
      <storeContext.Provider value={store}>
        <NoteView note={note} />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { component, store, note };
};

describe("NoteView", () => {
  test("should render note", () => {
    const { component, note } = getComponent();
    const { getByText } = render(component);
    expect(getByText(note.title)).toBeInTheDocument();
    expect(getByText(note.description)).toBeInTheDocument();
  });

  test("should trigger note edit", () => {
    const { component, store } = getComponent();
    const { getByText } = render(component);
    const editBtn = getByText("Edit");
    fireEvent.click(editBtn);
    expect(store.dispatch).toHaveBeenCalledWith(setNoteView(NOTE_EDIT_VIEW));
  });

  test("should trigger note edit", () => {
    const { component, store } = getComponent();
    const { getByText } = render(component);
    const editBtn = getByText("View Notes");
    fireEvent.click(editBtn);
    expect(store.dispatch).toHaveBeenCalledWith(setNoteView(NOTE_LIST_VIEW));
  });
});
