import { Platform } from "react-native";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMeals from "../screens/CategoryMealsScreen";
import MealDetail from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
import FavouriteScreen from "../screens/FavouriteScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FilterScreen from "../screens/FilterScreen";
const defaultStackNavOptions = {
  headerTitle: "test",
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTintColor: Platform.OS === "android" ? "white" : ""
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Category 1"
        // headerTintColor: Colors.primaryColor
      }
    },
    CategoryMeals: {
      screen: CategoryMeals
    },
    MealDetail: MealDetail
  },
  {
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const FavNavigator = createStackNavigator(
  {
    Favourites: FavouriteScreen,
    MealDetail: MealDetail
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MealFavTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            ></Ionicons>
          );
        },
        tarBarColor: Colors.primaryColor
      }
    },
    Favourites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarLabel: "Favourites!",
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="ios-star"
              size={25}
              color={tabInfo.tintColor}
            ></Ionicons>
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "yellow"
    }
  }
);
const FilterNavigator = createStackNavigator(
  {
    Filters: FilterScreen
  },
  {
    // navigationOptions: {
    //   drawerLabel: "Filters....."
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealFavTabNavigator
      // navigationOptions: {
      //   drawerLabel: "Meals"
      // }
    },
    Filters: FilterNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);
export default createAppContainer(MainNavigator);
