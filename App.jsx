import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { store } from "./src/redux/store.jsx";
import { Provider } from "react-redux";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import LottieView from 'lottie-react-native';
import Charging from "./src/screens/Charging";
import {
  Animated,
  Image,
  Easing,
  StyleSheet,
  View
} from "react-native";

// Your image source (require syntax is often used for local images)
const imageSource = require('./assets/LogoEco.png');
// Import lottie animation
const LOTTI_JSON = require('./src/anims/charging.json');

// Resolve the asset source
const resolvedSource = Image.resolveAssetSource(imageSource).uri;

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {

  return (
    <AnimatedAppLoader image={{ uri: resolvedSource  }}>
      <Provider store={store} >
        <GestureHandlerRootView style={{ flex: 1 }} >
          <MainNavigator />
        </GestureHandlerRootView>
      </Provider>
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animationProgress = useRef(new Animated.Value(0));
  const [isLayoutReady, setLayoutReady] = useState(false);


  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  // const { margin, normalize } = useTheme();

  useEffect(() => {
    Animated.loop(
        Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start(() => setAnimationComplete(true));
  }, [isAppReady]);

  // useEffect(() => {
  //   if (isAppReady) {
  //     Animated.timing(animation, {
  //       toValue: 0,
  //       duration: 2000,
  //       useNativeDriver: true,
  //     }).start(() => setAnimationComplete(true));
  //     console.log('animative  1: ', isSplashAnimationComplete)
  //   }
  // }, [isAppReady]);


  const onApplicationReady = useCallback(() => {
    setAppReady(true);
  }, []);

  const onLayout = useCallback(async () => {
    try {
        await SplashScreen.hideAsync();
    } catch (e) {
        // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  // const onImageLoaded = useCallback(async () => {
  //   try {
  //     await SplashScreen.hideAsync();
  //     // Load stuff
  //     await Promise.all([]);
  //   } catch (e) {
  //     // handle errors
  //   } finally {
  //     setAppReady(true);
  //   }
  // }, []);

  const showAnimation = !(isAppReady);
  
  const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
  });
  return (
    <SafeAreaProvider>
        {isAppReady && children}
        {showAnimation && (
            <View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, styles.splashContainer]}
                onLayout={onLayout}
            >
                <LottieView
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: 'white',
                    }}
                    source={LOTTI_JSON}
                    progress={animationProgress.current}
                />
            </View>
        )}
    </SafeAreaProvider>
    );

  // return (
  //   <View style={{ flex: 1 }}>
  //     {isAppReady && children}
  //     {!isSplashAnimationComplete && (
  //       <Animated.View
  //         pointerEvents="none"
  //         style={[
  //           StyleSheet.absoluteFill,
  //           {
  //             backgroundColor: '#fff',
  //             opacity: animation,
  //           },
  //         ]}
  //       >
  //         <Animated.Image
  //           style={{
  //             width: "100%",
  //             height: "100%",
  //             resizeMode: Constants.expoConfig.splash.resizeMode || "contain",
  //             transform: [
  //               {
  //                 scale: animation,
  //               },
  //             ],
  //           }}
  //           source={image}
  //           onLoadEnd={onImageLoaded}
  //           fadeDuration={0}
  //         />
  //       </Animated.View>
  //     )}
  //   </View>
  // );
}

