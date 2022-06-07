import * as React from "react";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer, useRoute,
} from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";
import Header from "./src/components/Header";

import { Routes } from "./routes";
import { PreferencesContext } from "./src/context/PreferencesContext";
import { Text } from "react-native";
import CardList from "./src/Screens/CardList";
import CardDetails from "./src/Screens/CardDetails";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createNativeStackNavigator();

// const CardList = React.lazy(
//   () => import(/* webpackChunkName: "card" */ "./src/Screens/CardList"),
// );
// const CardDetails = React.lazy(
//   () => import(/* webpackChunkName: "details" */ "./src/Screens/CardDetails"),
// );

const CardDetailsScreen = () => {
  const { params } = useRoute();
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <CardDetails params={params} />
    </React.Suspense>
  );
};

const CardListScreen = () => {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <CardList />
    </React.Suspense>
  );
};


export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState(null);
  const [isThemeCustom, setIsThemeCustom] = React.useState(false);
  let theme =
    customTheme || (isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme);

  const setTheme = React.useCallback(
    (customTheme?: PaperTheme) => {
      if (customTheme) {
        setCustomTheme(customTheme);
        setIsThemeCustom(true);
        setIsDarkTheme(customTheme.dark);
      } else {
        setCustomTheme(null);
        setIsThemeCustom(false);
        setIsDarkTheme(!isDarkTheme);
      }
    },
    [isDarkTheme],
  );

  const preferences = React.useMemo(
    () => ({
      setTheme,
      isThemeCustom,
      setIsThemeCustom,
    }),
    [setTheme, isThemeCustom],
  );

  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName={Routes.list}
              screenOptions={{
                headerMode: "screen",
                header: ({ scene, previous, navigation, ...rest }) => (
                  <Header
                    scene={scene}
                    previous={previous}
                    navigation={navigation}
                    {...rest}
                  />
                ),
              }}>
              <Stack.Screen name={Routes.list} component={CardListScreen} />
              <Stack.Screen name={Routes.details} component={CardDetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
