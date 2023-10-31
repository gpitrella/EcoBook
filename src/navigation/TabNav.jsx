import React from "react";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RootNavigator from "./RootNavigator";
import SettingsNavigator from "./SettingsNavigator";
import BookSearchScreen from "../screens/BookSearchScreen";
import PublishBook from "../screens/Setting/PublishBook";
import BookCar from "../screens/BookCar";
import StatusModal from '../components/StatusModal';
import ToastContainer from '../components/Toast';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

const TabNav = () => {
    const { colors } = useTheme();
      
  return (
    <>
    <Tab.Navigator 
        screenOptions={{ title: "", headerShown: false, 
          backgroundColor: '#fff',
          tabBarShowLabel: true,
          tabBarStyle:[{
            paddingTop: 10,
            paddingBottom: 8,
            marginBottom: 0,
            minHeight: 65,
            backgroundColor: '#fff',
            borderTopColor: '#dbdbdb'
          }]
       }} 
       
        >
      <Tab.Screen        
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={focused ? 30 : 29}
              color={focused ? colors.primary : "#717171"}
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Home',
        }}
        name="rootNavigation"
        component={RootNavigator}
      />
     <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="magnifying-glass"
              size={focused ? 30 : 29}
              color={focused ? colors.primary : "#717171"}
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Buscar',
        }}
        name="BookSearch"
        component={BookSearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons 
              name="flip-camera-android" 
              size={focused ? 30 : 29}
              color={focused ? colors.primary : "#717171"}
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Vender',
        }}
        name="publishBook"
        component={PublishBook}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="shopping-cart"
              size={focused ? 30 : 29}
              color={focused ? colors.primary : "#717171"}
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Carrito',
        }}
        name="BookCar"
        component={BookCar}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="user"
              size={focused ? 30 : 29}
              color={focused ? colors.primary : "#717171"}
            />
          ),
          tabBarShowLabel: true,
          tabBarLabel: 'Cuenta',
        }}
        name="settingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
    <StatusModal />
    <ToastContainer />
    </>
  );
};

export default TabNav;