import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import CategoriesScreen from "./screens/CategoriesScreen";
import FilterScreen from "./screens/FilterScreen";
import MealsNavigator from "./navigation/MealsNavigation";
import MealsNavigation from "./navigation/MealsNavigation";
import { useScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";

import mealsReducer from "./store/reducers/meals";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
useScreens();
const rootReducer = combineReducers({
  meals: mealsReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      ></AppLoading>
    );
  }
  return (
    <Provider store={store}>
      <MealsNavigator></MealsNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
