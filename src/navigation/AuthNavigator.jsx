import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartLogin from "../screens/Login/StartLogin";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Login/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="startLogin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="startLogin" component={StartLogin} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} /> 
    </Stack.Navigator>
  );
};

export default AuthNavigator;