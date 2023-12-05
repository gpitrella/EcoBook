import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import TabNav from "./TabNav";
import getTheme from '../../src/theme';
import { useGetBooksQuery } from "../services/ecApi";
import { useDispatch } from "react-redux";
import { setBooks, setWishBooks } from "../redux/slice/homeSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setIdToken, setUser } from "../redux/slice/authSlice";


const MainNavigator = () => {
  const scheme = useColorScheme();
  const { data: booksapi, isLoading, isError, error } = useGetBooksQuery();
  const dispatch = useDispatch();
    
  useEffect(() => {
    !isLoading && booksapi !== undefined ? dispatch(setBooks(booksapi)) : dispatch(setBooks([]));
    const checkUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail")
        const userToken = await AsyncStorage.getItem("userToken")
        if(userEmail && userToken) {
          dispatch(setUser(userEmail));
          dispatch(setIdToken(userToken));
        }  
      } catch (error) {
        console.log('Main Navigation: ', error);
      }      
    }
    checkUser();
    loadYourBooks();
  }, [isLoading]);

  // load books from async storage once
  async function loadYourBooks() {
  const json = await AsyncStorage.getItem('@yourwishlists');
  const data = json ? JSON.parse(json) : [];
   if(data[0]) {
     dispatch(setWishBooks(data))
   } 
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={getTheme(scheme)}>{<TabNav />}        
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;