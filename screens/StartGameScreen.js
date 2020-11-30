import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TileText from "../components/TitleText";

const StartGameScreen = (props) => {
  const [entredValue, setEntredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputhandler = (inputText) => {
    setEntredValue(inputText.replace(/[^0-9]/g), "");
  };

  const resetInputHandler = () => {
    setEntredValue("");

    setConfirmed(false);
  };
  const confirmInputHamdler = () => {
    const choseNumber = parseInt(entredValue);
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("Invalid Number", "Number should be > than 0 and < than 99", [
        { text: "Okay", styles: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(choseNumber);
    setEntredValue("");
    Keyboard.dismiss();
  };
  let confirmedOuput;
  if (confirmed) {
    confirmedOuput = (
      <Card style={styles.summaryContainer}>
        <BodyText> You selected </BodyText>
        <NumberContainer> {selectedNumber} </NumberContainer>
        <Button
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
          color={Colors.primary}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TileText style={styles.title}>Start New Game </TileText>
        <Card style={styles.inputContainer}>
          <BodyText> Select the number </BodyText>
          <Input
            style={styles.input}
            onChangeText={numberInputhandler}
            value={entredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHamdler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOuput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  input: {
    width: 150,
    textAlign: "center",
  },

  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
