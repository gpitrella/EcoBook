// WebViewScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Easing, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '@react-navigation/native';
import Text from '../components/Text';
import GoBack from '../components/GoBack';
import LottieView from 'lottie-react-native';
import { AntDesign } from '@expo/vector-icons';

const LOTTI_JSON = require('../../src/anims/charging.json');

const WebViewScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { url } = route.params;
  const [ charging, setCharging] = useState(true);
  const [ showInfo, setShowInfo] = useState(true);
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start(() => setAnimationComplete(true));
  }, []);

  // close Top Info
  const closeTopInfo = () => {
    setShowInfo(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1, 
    },
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
      zIndex: 1000
    },
    topInfo: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.warning,
      display: showInfo ? 'flex' : 'none'
    }
  });

   return (
    <SafeAreaView style={styles.mainContainer}>
      <GoBack navigation={navigation}/>
      <View style={styles.container}>
      {charging &&  
      <>
        <View style={[StyleSheet.absoluteFill, styles.splashContainer]}>
            <LottieView
                  style={{
                      width: 200,
                      height: 200,
                      backgroundColor: colors.backgroundColor,
                      zIndex: 100
                  }}
                  source={LOTTI_JSON}
                  progress={animationProgress.current}
              /> 
              </View></> }

        <View style={styles.topInfo}>
          <Text bold size={17} style={[styles.authorDetails, styles.itemDetails]}>Estas navengando en GoodRead</Text>
          <Pressable onPress={closeTopInfo}>
            <AntDesign color={colors.text} name="close" size={20} />
          </Pressable>
        </View>
        <WebView
            source={{ uri: url }}
            onLoadStart={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              setCharging(nativeEvent.loading)
            }}
            onLoadEnd={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              setCharging(nativeEvent.loading)
            }}
            
        /> 
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;