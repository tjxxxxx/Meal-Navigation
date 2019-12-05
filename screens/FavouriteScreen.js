import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
const FavouriteScreen = props => {
  //获取state状态
  const favMeals = useSelector(state => state.meals.favouriteMeals);
  // const favMeals = availableMeals.filter(
  //   meal => meal.id === "m1" || meal.id === "m2"
  // );
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favourite food found </DefaultText>
      </View>
    );
  }
  return (
    <MealList listData={favMeals} navigation={props.navigation}></MealList>
  );
};
FavouriteScreen.navigationOptions = navData => {
  return {
    headerTitle: " Favourite Meal",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default FavouriteScreen;
