import { KitchnProvider, createTheme, darkTheme } from "kitchn";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import Layout from "../components/layout";
import { accentColors } from "../services/themes";

import "kitchn/fonts.css";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <KitchnProvider
        themes={{
          dark: createTheme({
            ...darkTheme,
            colors: {
              ...darkTheme.colors,
              accent: accentColors,
            },
          }),
          light: createTheme({
            ...darkTheme,
            name: "light",
            colors: {
              ...darkTheme.colors,
              accent: accentColors,
            },
          }),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </KitchnProvider>
    </SessionProvider>
  );
};

export default App;
