import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import client from "../../api-client/client";
import { storeContext } from "../../store";
import NoteList from "../NoteList";

const clientGet = jest.spyOn(client, "get");
const clientDelete = jest.spyOn(client, "delete");

const getComponent = () => {
  const store = {
    dispatch: jest.fn(),
  };
  const component = (
    <ThemeProvider>
      <storeContext.Provider value={store}>
        <NoteList />
      </storeContext.Provider>
    </ThemeProvider>
  );
  return { store, component };
};

describe("NoteList", () => {
  const notes = [
    {
      id: 1,
      title: "note title",
      description: "note description",
      user_id: null,
    },
  ];
  test("should render note list", async () => {
    clientGet.mockReturnValueOnce(Promise.resolve({ data: notes }));
    const { component } = getComponent();
    const { findByText } = render(component);
    await findByText(notes[0].title);
  });

  test("should show note view when clicked", async () => {
    clientDelete.mockResolvedValue(Promise.resolve());
    const { component, store } = getComponent();
    const { findByText } = render(component);
    const noteBtn = await findByText(notes[0].title);
    fireEvent.click(noteBtn);
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("should delete note when clicked", async () => {
    clientDelete.mockResolvedValue(Promise.resolve());
    const { component } = getComponent();
    const { findByLabelText } = render(component);
    const noteDeleBtn = await findByLabelText("delete note");
    clientGet.mockResolvedValue(Promise.resolve({ data: [] }));
    fireEvent.click(noteDeleBtn);
    expect(clientDelete).toHaveBeenCalledWith(`/notes/${notes[0].id}`);
  });

  test("should show no notes if there is not note", () => {
    clientGet.mockResolvedValue({ data: [] });
    const { component } = getComponent();
    const { getByText } = render(component);
    expect(getByText(/no notes/i)).toBeInTheDocument();
  });
});
