import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/colors";
import TileText from "../components/TitleText";
const Header = (props) => {
  return (
    <View style={styles.header}>
      <TileText> {props.title} </TileText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    padding: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
