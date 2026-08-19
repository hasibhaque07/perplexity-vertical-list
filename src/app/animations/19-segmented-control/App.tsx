import * as Font from "expo-font";
import { useEffect, useState } from "react";

import sfCompactRoundedMedium from "./assets/fonts/SF-Compact-Rounded-Medium.otf";
import App from "./src";

const AppContainer = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "SF-Compact-Rounded-Medium": sfCompactRoundedMedium,
        });

        setFontsLoaded(true);
      } catch (error) {
        console.error("Failed to load font:", error);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <App />;
};

export default AppContainer;
