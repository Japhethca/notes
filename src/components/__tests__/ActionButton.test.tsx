import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { render, screen, fireEvent } from "@testing-library/react";

import ActionButton from "../ActionButton";

describe("ActionButton", () => {
  const props = {
    text: "test",
    onClick: jest.fn(),
  };
  const Button = (
    <ThemeProvider>
      <ActionButton {...props} />
    </ThemeProvider>
  );
  test("should render button text", () => {
    render(Button);
    const btn = screen.getByText(props.text);
    expect(btn).toBeInTheDocument();
  });

  test("should handle clicks", () => {
    render(Button);
    const btn = screen.getByText(props.text);
    fireEvent.click(btn);
    expect(props.onClick).toHaveBeenCalled();
  });
});
