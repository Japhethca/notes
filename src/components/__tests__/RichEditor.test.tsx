import React  from "react";
import { render } from "@testing-library/react";

import RichEditor from "../RichEditor";

const getComponent = () => {
  const props = {
    initialValue: "testing note",
    onChange: jest.fn(),
  };
  const component = <RichEditor {...props} />;
  return { component, props };
};
describe("RichEditor", () => {
  test("should render rich editor", async () => {
    const { component, props } = getComponent();
    const { findByText } = render(component);
    await findByText(props.initialValue);
  });
});
