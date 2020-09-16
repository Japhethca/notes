import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import Note from "../Note";
import { render, fireEvent } from "@testing-library/react";

const getComponent = (props?: any) => {
  const noteProps = {
    note: {
      id: 1,
      title: "test note",
      description: "note description",
    },
    onClick: jest.fn(),
    handleDelete: jest.fn(),
    handleEdit: jest.fn(),
    isDeleting: { state: false, noteId: 1 },
    ...props,
  };
  const component = (
    <ThemeProvider>
      <Note {...noteProps} />
    </ThemeProvider>
  );
  return { component, noteProps };
};

describe("Note", () => {
  test("should render note title", () => {
    const { component, noteProps } = getComponent();
    const { getByText } = render(component);
    expect(getByText(noteProps.note.title)).toBeInTheDocument();
  });

  test("should display [no title] if note has no title", () => {
    const note = {
      id: 1,
      title: "",
    };
    const { component } = getComponent({ note });
    const { getByText } = render(component);
    expect(getByText(/[no title]/i)).toBeInTheDocument();
  });

  test("should goto note view when clicked", () => {
    const { component, noteProps } = getComponent();
    const { getByText } = render(component);
    const noteTitle = getByText(noteProps.note.title);
    fireEvent.click(noteTitle);
    expect(noteProps.onClick).toHaveBeenCalled();
  });

  test("should goto note edit when edit button is clicked", () => {
    const { component, noteProps } = getComponent();
    const { getByLabelText } = render(component);
    const editBtn = getByLabelText("edit note");
    fireEvent.click(editBtn);
    expect(noteProps.handleEdit).toHaveBeenCalled();
  });

  test("should delete note when delete button is clicked", () => {
    const { component, noteProps } = getComponent();
    const { getByLabelText } = render(component);
    const deleteBtn = getByLabelText("delete note");
    fireEvent.click(deleteBtn);
    expect(noteProps.handleDelete).toHaveBeenCalled();
  });
});
