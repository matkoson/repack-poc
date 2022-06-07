import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { generateDarkTheme, generateLightTheme } from "../utils";
import { PreferencesContext } from "../context/PreferencesContext";

const customThemes = [
  {
    name: "some orange light theme",
    theme: generateLightTheme({
      primary: "#6200EE",
      accent: "#03DAC6",
      background: "#fff",
      surface: "#fff",
      onSurface: "#fff",
      error: "#C51162",
      text: "#000",
      disabled: "rgba(0, 0, 0, 0.38)",
    }),
  },
  {
    name: "some orange light theme",
    theme: generateDarkTheme({
      surface: "#121212",
      accent: "#f50057",
      onSurface: "#fff",
      background: "#141d26",
      primary: "#243447",
      error: "#f44336",
      text: "rgb(229, 229, 231)",
      disabled: "rgba(0, 0, 0, 0.38)",
    }),
  },
  {
    name: "some orange light theme",
    theme: generateDarkTheme({
      primary: "#657786",
      accent: "#f50057",
      background: "#F5F8FA",
      surface: "#F5F8FA",
      error: "#f44336",
      text: "#000",
      disabled: "rgba(0, 0, 0, 0.38)",
    }),
  },
];

const ThemeMenu = () => {
  const [visible, setVisible] = React.useState(false);
  const { setTheme } = React.useContext(PreferencesContext);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
      >
        <Menu.Item
          onPress={() => {
            setTheme(customThemes[0].theme);
            closeMenu();
          }}
          title="Item 1"
        />
        <Menu.Item
          onPress={() => {
            setTheme(customThemes[1].theme);
            closeMenu();
          }}
          title="Item 2"
        />
        <Menu.Item
          onPress={() => {
            setTheme(customThemes[2].theme);
            closeMenu();
          }}
          title="Item 3"
        />
        <Divider />
        <Menu.Item onPress={() => {
        }} title="Item 3" />
      </Menu>
    </View>
  );
};

export default ThemeMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
