import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GetStarted from "./screens/GetStarted";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Welcome from "./screens/Welcome";
import Chat from "./screens/Chat";
import Feedback from "./screens/Feedback";

const RootNavigation = (props) => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const transitionConfig = {
    animation: "spring",
    config: {
      stiffness: 500,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.initRoute}
        screenOptions={{
          ...screenOptions,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      >
        {/* screens */}
        <Stack.Screen
          name="getstarted"
          component={GetStarted}
          options={{ title: "getstarted" }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ title: "signup" }}
        />
        <Stack.Screen
          name="home"
          component={Welcome}
          options={{ title: "home" }}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ title: "chat" }}
        />
        <Stack.Screen
          name="feedback"
          component={Feedback}
          options={{ title: "feedback" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
