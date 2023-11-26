import React, { useState, useEffect } from "react";
import BooksScreen from '../screens/BooksScreen';
import BookListScreen from '../screens/BookListScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import BookSearchScreen from '../screens/BookSearchScreen';
import BookWishList from '../screens/BookWishList';
import BookCar from '../screens/BookCar';
import Address from '../screens/Address';
import Shipping from '../screens/Shipping';
import Payment from '../screens/Payment';
import SettingsScreen from '../screens/Setting/Settings';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from '../navigation/AuthNavigator';
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebViewScreen from '../screens/WebViewScreen';


// Root Stack of App
function RootNavigator() {
  // const BookStack = createSharedElementStackNavigator();
  const BookStack = createNativeStackNavigator();
  const [checkedUser, setCheckedUser] = useState({ user: null, token: null});
  const user = useSelector((state) => state.authSlice.user);
  const idToken = useSelector((state) => state.authSlice.idToken);
  const firstAccess = useSelector((state) => state.homeSlice.firstAccess);

  const fadeScreen = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail")
        const userToken = await AsyncStorage.getItem("userToken")
        userEmail && userToken ? setCheckedUser({ user: userEmail, token: userToken}) : setCheckedUser({ user: user, token: idToken})
      } catch (error) {
        console.log(error);
      }      
    }
    checkUser();
  }, [user]);

  const bookTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  const searchTranstion = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  return (
    <BookStack.Navigator
      initialRouteName= { firstAccess ? "BookList" : "Books" }
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      detachInactiveScreens={false}
    >
      { firstAccess ? null : <BookStack.Screen component={BooksScreen} name="Books" /> }
      <BookStack.Screen component={BookListScreen} name="BookList" />
      <BookStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        sharedElements={(route, otherRoute) => {
          if (['BookList', 'BookSearch'].includes(otherRoute.name)) {
            return [route.params.book.bookId];
          }
          return [];
        }}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: bookTransition,
            close: bookTransition,
          },
        }}
      />
      <BookStack.Screen
        name="BookSearch"
        component={BookSearchScreen}
        sharedElements={(_, otherRoute) => (otherRoute.name === 'BookList' ? [{
          id: 'search',
          animation: 'fade',
          resize: 'clip',
          align: 'left-top',
        }] : [])}
        options={{
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: searchTranstion,
            close: searchTranstion,
          },
        }}
      />
      <BookStack.Screen name="WishList" component={BookWishList} />
      <BookStack.Screen name="BookCar" component={BookCar} />
      <BookStack.Screen 
        name="Address" 
        component={!checkedUser.user && !checkedUser.token ? AuthNavigator : Address}
        sharedElements={(route, otherRoute) => {
          if (['BookDetails'].includes(otherRoute.name)) {
            return [route.params.book.bookId];
          }
          return [];
        }}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: bookTransition,
            close: bookTransition,
          },
        }} />
      <BookStack.Screen 
         name="Shipping" 
         component={!checkedUser.user && !checkedUser.token ? AuthNavigator : Shipping} 
         sharedElements={(route, otherRoute) => {
            if (['Address'].includes(otherRoute.name)) {
              return [route.params.book.bookId];
            }
            return [];
          }}
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: fadeScreen,
            transitionSpec: {
              open: bookTransition,
              close: bookTransition,
            },
          }}/>
      <BookStack.Screen 
         name="Payment" 
         component={!checkedUser.user && !checkedUser.token ? AuthNavigator : Payment} 
         sharedElements={(route, otherRoute) => {
            if (['Shipping'].includes(otherRoute.name)) {
              return [route.params.book.bookId];
            }
            return [];
          }}
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: fadeScreen,
            transitionSpec: {
              open: bookTransition,
              close: bookTransition,
            },
          }}/>
          <BookStack.Screen name="SettingsScreen" component={SettingsScreen} />
          <BookStack.Screen name="WebView" component={WebViewScreen} />
    </BookStack.Navigator>
  );
}

export default React.memo(RootNavigator);
