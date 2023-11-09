import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Books from '../../components/Books';

// Default screen
function YourPublishBook({ navigation }) {

  const [userStore, setUserStore] = useState(true);
  const email = useSelector((state) => state.authSlice.user);
  const allBooks = useSelector((state) => state.homeSlice.books);

  // Find yourBooks
  const yourBooks = allBooks ? allBooks.filter(item => item.user == userStore) : []

  useEffect(() => {
    const checkStoreUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail")        
        const userToken = await AsyncStorage.getItem("userToken")
        userEmail && userToken ? setUserStore(userEmail) : null;
      } catch (error) {
        console.log(error);
      }  
    }
    checkStoreUser();    
    }, [email]);

  return (
    <Books navigation={navigation} yourBooks={yourBooks}/>
  );
}

export default React.memo(YourPublishBook);
