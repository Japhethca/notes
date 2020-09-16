import { ThemeProvider } from "@chakra-ui/core";

import "../styles/base.css";
import Provider from "../store/Provider";
import { setDefaultHeaders } from "../api-client/client";

const Application = ({ Component, pageProps }) => {
  setDefaultHeaders();
  return (
    <Provider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default Application;
