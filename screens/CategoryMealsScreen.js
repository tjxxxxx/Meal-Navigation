import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import MealItem from "../components/MealItem";
import MealList from "../components/MealList";
import MealDetail from "./MealDetailScreen";
const CategoryMeals = props => {
  const catId = props.navigation.getParam("categoryId");
  // const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meal, check filter.</DefaultText>
      </View>
    );
  }

  // console.log(catId);
  return (
    <MealList
      listData={displayedMeals}
      navigation={props.navigation}
    ></MealList>
  );
};
CategoryMeals.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title
    // headerStyle: {
    //   backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
    // },
    // headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
  };
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default CategoryMeals;
