import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import TabNav from "./TabNav";
import getTheme from '../../src/theme';
import { useGetBooksQuery } from "../services/ecApi";
import { useDispatch } from "react-redux";
import { setBooks, setWishBooks } from "../redux/slice/homeSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainNavigator = () => {
  const scheme = useColorScheme();

  const { data: booksapi, isLoading, isError, error } = useGetBooksQuery();
  const dispatch = useDispatch();
    
  useEffect(() => {
    !isLoading && booksapi !== undefined ? dispatch(setBooks(booksapi)) : dispatch(setBooks([]));
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
      <NavigationContainer theme={getTheme(scheme)}>{<TabNav />}        
      </NavigationContainer>
  );
};

export default MainNavigator;