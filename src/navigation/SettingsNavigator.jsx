import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Setting/Settings";
import TermsAndConditions from "../screens/TermsAndConditions";
import PublishBook from "../screens/Setting/PublishBook";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {

  const [checkedUser, setCheckedUser] = useState({ user: null, token: null});
  const user = useSelector((state) => state.authSlice.user);
  const idToken = useSelector((state) => state.authSlice.idToken);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail")
        const userToken = await AsyncStorage.getItem("userToken")
        userEmail && userToken ? setCheckedUser({ user: userEmail, token: userToken}) : setCheckedUser({ user: user, token: idToken});
      } catch (error) {
        console.log(error);
      }      
    }
    checkUser();
  }, [user])
  
  return (<>
    { !checkedUser.user && !checkedUser.token ? <AuthNavigator /> :
      <Stack.Navigator initialRouteName="settings" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="termsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="publishBook" component={PublishBook} />
      </Stack.Navigator>
     }
  </>
  );
};

export default SettingsNavigator;