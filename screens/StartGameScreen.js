import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TileText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [entredValue, setEntredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setbuttonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const numberInputhandler = (inputText) => {
    setEntredValue(inputText.replace(/[^0-9]/g), "");
  };

  const resetInputHandler = () => {
    setEntredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setbuttonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.addEventListener("change", updateLayout);
    };
  });
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
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
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
                <Button
                  title="Reset"
                  color={Colors.primary}
                  onPress={resetInputHandler}
                  style={buttonWidth}
                />
                <Button
                  title="Confirm"
                  color={Colors.accent}
                  onPress={confirmInputHamdler}
                  style={buttonWidth}
                />
              </View>
            </Card>
            {confirmedOuput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
    width: "100%",
    // maxWidth: "90%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  button: {
    width: Dimensions.get("window").width / 3,
  },

  input: {
    width: 35,
    textAlign: "center",
  },

  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
