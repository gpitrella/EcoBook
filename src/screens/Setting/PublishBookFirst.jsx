import React, { useState, useEffect } from 'react'
import { View, StyleSheet, } from "react-native";
import GoBack from '../../components/GoBack';
import { useTheme } from '@react-navigation/native';
import Animated, { interpolate, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AuthNavigator from "../../navigation/AuthNavigator";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PublishBookSearch from './PublishBookSearch';

function PublishBookFirst({ navigation }) {
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const moved = useSharedValue(0);
  const closing = useSharedValue(0.9);
  const [checkedUser, setCheckedUser] = useState({ user: null, token: null});
  const user = useSelector((state) => state.authSlice.user);
  const idToken = useSelector((state) => state.authSlice.idToken);
  const [yourSelectedBook, setYourSelectedBook] = useState({})

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
  }, [user])

 
// Screen anims
const anims = {
  screen: useAnimatedStyle(() => ({
    flex: 1,
    opacity: withTiming(closing.value < 0.9 ? 0 : 1),
    overflow: 'hidden',
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: closing.value < 0.9 ? closing.value : interpolate(moved.value, [0, 75], [1, 0.9], 'clamp') },
    ],
    borderRadius: interpolate(moved.value, [0, 10], [0, 30], 'clamp'),
  })),
  scrollView: {
    flex: 1,
  }
};

const styles = StyleSheet.create({
    backBtn: {
      width: '100%',
      position: 'absolute',
      paddingTop: 50,
      zIndex: 100,
      top: 0,
      backgroundColor: '#fff'
    },
    details: { 
      width: '100%',
      height: '100%',
      textAlign: 'center',
      margin: 'auto',
      justifyContent: 'center',
    }
  })

  return (<>
    { !checkedUser.user && !checkedUser.token ? <AuthNavigator /> : 
      <Animated.View style={anims.screen}>
          <View style={styles.backBtn}> 
            <GoBack navigation={navigation} />
          </View>       
          <Animated.View style={anims.scrollView}>
            <Animated.View style={styles.details}> 
              <PublishBookSearch navigation={navigation} setYourSelectedBook={setYourSelectedBook}/>    
            </Animated.View> 
          </Animated.View>            
      </Animated.View>}
   </>)
};

export default React.memo(PublishBookFirst);