import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../store/actions/meals";

// import { Ionicons } from "@expo/vector-icons";
const ListItem = props => {
  return (
    <View style={styles.ListItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};
const MealDetail = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  // console.log(availableMeals);

  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavourite = useSelector(state =>
    state.meals.favouriteMeals.some(meal => meal.id === mealId)
  );
  console.log(currentMealIsFavourite);
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);
  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [toggleFavouriteHandler]);
  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite });
  }, [currentMealIsFavourite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      {/* <Text>..eeee</Text> */}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};
MealDetail.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam("mealId");
  const toggleFavourite = navigationData.navigation.getParam("toggleFav");
  console.log(toggleFavourite);
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFavourite = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favourite"
          iconName={isFavourite ? "ios-star" : "ios-star-outline"}
          // onPress={toggleFavourite}
          onPress={() => {
            toggleFavourite();
          }}
        ></Item>
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  ListItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  }
});
export default MealDetail;
