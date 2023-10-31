import React, { useEffect } from 'react';
import {
  View, Image, StyleSheet, LayoutAnimation, Pressable,
} from 'react-native';
import Animated, {
  withTiming, interpolate, Extrapolate, withDelay,
  useDerivedValue, useAnimatedStyle, useSharedValue,
} from 'react-native-reanimated';
import { useTheme, useFocusEffect, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { genres } from '../utils/constant';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

import Text from './Text';
import { setModal } from './StatusModal';

// single book component
function Genre({ genre, scrollX, index }) {
  const navigation = useNavigation();
  const { margin, colors, normalize } = useTheme();
  const BOOKW = normalize(120, 150);
  const BOOKH = BOOKW * 1.5;
  const position = useDerivedValue(() => (index + 0.00001) * (BOOKW + margin) - scrollX.value);
  const inputRange = [-BOOKW, 0, BOOKW, BOOKW * 3];
  const loaded = useSharedValue(0);
  const opacity = useSharedValue(1);

  // book details screen
  const bookDetails = () => {
    Haptics.selectionAsync();
    opacity.value = withDelay(300, withTiming(0));
    navigation.push('BookSearch');
  };

  // change book status
  const changeStatus = () => {
    Haptics.selectionAsync();
    setModal(genre);
  };

  // slide books in
  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
    loaded.value = withTiming(1);
  }, []);

  // show book on focus
  useFocusEffect(
    React.useCallback(() => {
      opacity.value = withTiming(1);
    }, []),
  );

  // animated styles
  const anims = {
    genre: useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [
        { perspective: 800 },
        { scale: interpolate(position.value, inputRange, [0.9, 1, 1, 1], Extrapolate.CLAMP) },
        { rotateY: `${interpolate(position.value, inputRange, [60, 0, 0, 0], Extrapolate.CLAMP)}deg` },
        {
          translateX: scrollX.value
            ? interpolate(position.value, inputRange, [BOOKW / 3, 0, 0, 0], 'clamp')
            : interpolate(loaded.value, [0, 1], [index * BOOKW, 0], 'clamp'),
        },
      ],
    })),
  };

  // non animated styles
  const styles = StyleSheet.create({
    imgBox: {
      marginRight: margin,
      borderRadius: 10,
      elevation: 6,
      shadowRadius: 6,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 6 },
    },
    bookImg: {
      width: BOOKH,
      height: BOOKW,
      borderRadius: 10,
    },
    bookText: {
      width: BOOKW,
      left: 30,
      marginRight: margin,
      marginTop: margin / 2,
      fontSize:22,
      fontWeight: 'bold',
      position: 'absolute',
      color: colors.white,
    },
  });

  return (
    <Pressable onPress={bookDetails} onLongPress={changeStatus}>
      <Animated.View style={anims.book}>
        <SharedElement id={genre.genreId}>
          <View style={styles.imgBox}>
          <LinearGradient
              // Background Linear Gradient
              colors={index % 2 === 0 ? ['#075230', '#74c69d'] : ['#74c69d', '#075230']}
              style={styles.bookImg}
            />
            {/* <Image style={styles.bookImg} source={{ uri: genre.imageUrl }} /> */}
          </View>
        </SharedElement>
        { index % 2 === 0 ?  
        <Text size={13} numberOfLines={1} center style={styles.bookText} top={10} >
          {genre}
        </Text>
        : <Text size={13} numberOfLines={1} center style={styles.bookText} bottom={20} >
          {genre}
        </Text> }
      </Animated.View>
    </Pressable>
  );
}

export default React.memo(Genre);
