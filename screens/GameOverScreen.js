import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GmaeOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game Is Over!</Text>
      <Text>Number Of rounds: {props.roundNumber} </Text>
      <Text>Number was: {props.userNumber} </Text>
      <Button title="New Game" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GmaeOverScreen;
