import React from "react";

import Layout from "../Layout";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";
import { storeContext } from "../../store";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {},
    };
  },
}));

const getComponent = () => {
  const storeValue = {
    state: {
      isAuthenticated: false,
    },
  };
  return (
    <ThemeProvider>
      <storeContext.Provider value={storeValue}>
        <Layout>
          <p>test</p>
        </Layout>
      </storeContext.Provider>
    </ThemeProvider>
  );
};

describe("Layout", () => {
  test("should should render child components", () => {
    const { getByText } = render(getComponent());
    expect(getByText("test")).toBeInTheDocument();
  });
});
