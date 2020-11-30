import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import { Colors } from "react-native/Libraries/NewAppScreen";

const generaterandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generaterandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, roundNumer) => (
  <View key={value} style={sytles.listItem}>
    <BodyText> #{roundNumer} </BodyText>
    <BodyText> {value} </BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generaterandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setpastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "you know that this is wrong ... ", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generaterandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRound) => curRound + 1);
    setpastGuesses((curPasGuesses) => [nextNumber, ...curPasGuesses]);
  };

  return (
    <View style={sytles.screen}>
      <Text>Opponent's Guess </Text>
      <NumberContainer>{currentGuess} </NumberContainer>
      <Card style={sytles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove-circle" size={34} color={Colors.accent} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add-circle" size={34} color={Colors.accent} />
        </MainButton>
      </Card>
      <View style={sytles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const sytles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});

export default GameScreen;
