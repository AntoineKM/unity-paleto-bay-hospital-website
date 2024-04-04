import { KitchnProvider, createTheme, darkTheme } from "kitchn";
import { AppProps } from "next/app";

import "kitchn/fonts.css";
import { accentColors } from "../services/themes";

const App = ({ Component, pageProps }: AppProps) => {
  return (
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
      <Component {...pageProps} />
    </KitchnProvider>
  );
};

export default App;
