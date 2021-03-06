import * as React from "react";
import { List, useTheme } from "react-native-paper";
import { Image, StyleSheet } from "react-native";

const CardDetails = ({ params }) => {
  const { subtitle, title, content, uri } = params;
  const theme = useTheme();
  return (
    <List.Section theme={theme}>
      <List.Subheader>{title}</List.Subheader>
      <Image
        style={styles.image}
        source={{
          uri,
        }}
      />
      <List.Item
        title={subtitle}
        left={() => <List.Icon icon="account-details" />}
      />
      <List.Item title={content} left={() => <List.Icon icon="folder" />} />
    </List.Section>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
