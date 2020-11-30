import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GmaeOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game Is Over!</TitleText>
      <Image
        source={require("../assets/sucesss.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.bodyContainer}>
        <BodyText style={styles.resultText}>
          To guess the number
          <Text style={styles.highlights}> {props.userNumber} </Text>
          Your comupter execute
          <Text style={styles.highlights}> {props.roundNumber} </Text> rounds.
        </BodyText>
      </View>

      <View style={styles.buttonContainer}>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  button: {
    width: "40%",
  },
  image: {
    width: "100%",
  },
  highlights: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  resultText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default GmaeOverScreen;
