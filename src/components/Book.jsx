import React, { useEffect, useRef } from 'react';
import {
  View, Image, StyleSheet, LayoutAnimation, Pressable,
} from 'react-native';
import Animated, {
  withTiming, interpolate, Extrapolate, withDelay,
  useDerivedValue, useAnimatedStyle, useSharedValue,
} from 'react-native-reanimated';
import { useTheme, useFocusEffect, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Haptics from 'expo-haptics';
import Text from './Text';
import { setModal } from './StatusModal';

// single book component
function Book({ book, scrollX, index, cameFromDetails }) {
  const navigation = useNavigation();
  const { margin, normalize } = useTheme();
  const BOOKW = normalize(150, 150);
  const BOOKH = BOOKW * 1.5;
  const position = useDerivedValue(() => (index + 0.00001) * (BOOKW + margin) - scrollX.value);
  const inputRange = [-BOOKW, 0, BOOKW, BOOKW * 3];
  const loaded = useSharedValue(0);
  const opacity = useSharedValue(1);

  // book details screen
  const bookDetails = () => {
    Haptics.selectionAsync();
    opacity.value = withDelay(300, withTiming(0));
    if(cameFromDetails) { navigation.goBack(); }
    navigation.navigate('BookDetails', { book });
  };

  // change book status
  const changeStatus = () => {
    Haptics.selectionAsync();
    setModal(book);
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
    book: useAnimatedStyle(() => ({
      opacity: opacity.value,
      width: '100%',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
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
      width: BOOKW,
      height: BOOKH,
      borderRadius: 10,
      margin: 'auto',

    },
    bookText: {
      width: BOOKW,
      marginRight: margin,
      marginTop: margin / 2,
    },
  });

  return (
    <Pressable onPress={bookDetails} onLongPress={changeStatus} key={index}>
      <Animated.View style={anims.book}>
        <SharedElement id={book.bookId}>
          <View style={styles.imgBox}>
            <Image style={styles.bookImg} source={{ uri: book.imagesUrl[0] }} />
          </View>
        </SharedElement>
        <Text weight={700} size={16} numberOfLines={2} left style={styles.bookText}>
          {book.title}
        </Text>
        <Text size={14} numberOfLines={1} left style={styles.bookText}>
        ⭐ {book.avgRating} - $ {book.price}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export default React.memo(Book);
