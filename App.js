import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Font from "expo-font";
import { AppLoading, Apploading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUsernumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const [dataLoaded, setDataloaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataloaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewgamehandler = () => {
    setGuessRounds(0);
    setUsernumber(null);
  };

  const startGameHamdler = (selectedNumber) => {
    setUsernumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverhandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHamdler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverhandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewgamehandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Geuss a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
