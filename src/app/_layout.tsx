import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react";

// スプラッシュスクリーンを維持
SplashScreen.preventAutoHideAsync();

const Layout = (): JSX.Element => {

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    'Noto_Sans_JP': require("../../assets/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf")
  });

  // フォントロード完了後にスプラッシュスクリーンを非表示
  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [fontsLoaded]);

  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: "#467FD3",
    },
    headerTintColor: "#ffffff",
    headerTitle: "ゴジオケ",
    headerBackTitle: "Back",
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: "bold",
      fontFamily: "Noto_Sans_JP"
    },
  }}/>
}

export default Layout;