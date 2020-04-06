import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React from "react";
import App from "../../App";
import Home from "../pages/home/Home";
import {NewsDetail} from "../pages/latest-news/NewsDetail";
const Stack = createStackNavigator();
function RouterView() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions= {
          {
              headerShown:false,
          }
      }>
        <Stack.Screen   name="Home" component={Home} options = {
          {
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }
        }/>
        <Stack.Screen name="NewsDetail" component = {NewsDetail} options = {
          {
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RouterView;
