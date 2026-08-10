import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Fraunces_500Medium,
  Fraunces_500Medium_Italic,
} from "@expo-google-fonts/fraunces";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

import RootNavigator from "./src/navigation/RootNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_500Medium,
    Fraunces_500Medium_Italic,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}
