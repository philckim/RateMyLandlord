import React, { useContext } from "react";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStackNavigator } from "./StackNavigator.js";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <Foundation name="magnifying-glass" size={size} color={color} />
              );
            case "Recent":
              return <Entypo name="new" size={size} color={color} />;
            case "Saved":
              return <Entypo name="heart" size={size} color={color} />;
            case "Login":
              return <Ionicons name="md-person" size={size} color={color} />;
            case "Profile":
              return <Ionicons name="md-person" size={size} color={color} />;
            case "More":
              return <Ionicons name="ios-more" size={size} color={color} />;
            default:
              return (
                <Ionicons
                  name="ios-information-circle"
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
