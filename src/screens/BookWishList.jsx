import React, { useState }  from 'react';
import {
  View, StyleSheet, Pressable, Keyboard,
} from 'react-native';
import Animated, {
  interpolate, Extrapolate, withTiming, useSharedValue, useAnimatedScrollHandler, useAnimatedStyle,
} from 'react-native-reanimated';
import Entypo from "react-native-vector-icons/Entypo";
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

import Text from '../components/Text';
import SearchBook from '../components/SearchBook';
import { useSelector } from "react-redux";
import MainBook from '../components/MainBook';

const stack = require('../anims/stack.json');

// Default screen
function BookWishList({ navigation }) {
  const {
    colors, height, margin, status, navbar,
  } = useTheme();
  const [showGrid, setShowGrid] = useState(true);
  const yourWhishBooks = useSelector((state) => state.homeSlice.yourWhishBooks);
  const allBooks = useSelector((state) => state.homeSlice.books);
  // Find yourBooks
  const wishlist = allBooks.filter(item => yourWhishBooks.includes(item.bookId));

  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);

  // animate on screen load
  const onLayout = () => {
    loaded.value = withTiming(1);
  };

  // scroll handler
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // view book details
  const bookDetails = (book) => {
    Haptics.selectionAsync();
    navigation.navigate('BookDetails', { book });
  };

  // edit selected book
  const editStatus = (book) => {
    setModal(book);
    Keyboard.dismiss();
    Haptics.selectionAsync();
  };

  // change View Books
  const changeView = () => {
    if(showGrid) {
      setShowGrid(false);
    } else {
      setShowGrid(true);
    }
  };
  // animated styles
  const anims = {
    search: useAnimatedStyle(() => ({
      zIndex: 10,
      height: navbar,
      alignItems: 'flex-end',
      flexDirection: 'row',
      paddingTop: status,
      paddingBottom: 6,
      paddingHorizontal: margin,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
      shadowOpacity: interpolate(scrollY.value, [0, 20], [0, 0.75], Extrapolate.CLAMP),
    })),
    scrollView: useAnimatedStyle(() => ({
      opacity: interpolate(loaded.value, [0, 1], [0, 1], Extrapolate.CLAMP),
      transform: [
        { translateY: interpolate(loaded.value, [0, 1], [50, 0], Extrapolate.CLAMP) },
      ],
    })),
  };

  // Other styles
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sharedElement: {
      flex: 1,
      height: 38,
    },
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    searchInput: {
      flex: 1,
      height: 38,
      fontSize: 15,
      borderRadius: 20,
      color: colors.text,
      paddingHorizontal: margin,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      height: 38,
      width: '100%',
      fontSize: 16,
    },
    saveButton: {
      width: 60,
      height: 38,
      lineHeight: 38,
      textAlign: 'right',
      color: '#888888',
    },
    placeholderBox: {
      alignItems: 'center',
      marginTop: margin * 2,
      justifyContent: 'center',
    },
    placeholderImg: {
      opacity: 0.95,
      height: height / 3.5,
      marginBottom: margin,
    },
    placeholderText: {
      fontSize: 15,
      paddingHorizontal: margin * 3,
    },
    wishlistTitle: {
      fontSize: 17,
      fontWeight: '600',
      marginLeft: 10,
    },
    scrollContainer: {
      padding: margin,
    },
    mainBook: {
      marginTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginLeft: 20,
      marginRight: 20,
      alignContent: 'space-around',
    },
    containerBook: {
      width: '50%',
      marginBottom: 20
    },
    rowItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    rowItem1: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 5,
    },
  });

  // empty screen placeholders
  const PlaceHolder = () => (
    <View style={styles.placeholderBox}>
      <LottieView
        autoPlay
        loop={false}
        speed={0.8}
        source={stack}
        style={styles.placeholderImg}
      />
      <Text center style={styles.placeholderText}>
         No tienes ningun libro agregado a tus Favoritos. Agrega tu primer libro.
      </Text>
    </View>
  );

  // render search page
  return (
    <>
    <View onLayout={onLayout} style={styles.screen}>
      <Animated.View style={anims.search}>
            <View style={styles.rowItem}>
              <Entypo name={'bookmarks'} size={24} color={'#52B788'} />
              <Text style={styles.wishlistTitle}>
                Tus Favoritos
              </Text>
            </View>
            <View style={styles.rowItem1}>
              <Pressable onPress={() => changeView()} >
                <Entypo name={'grid'} size={30} color={showGrid ? '#dbdbdb' : '#52B788'} />
              </Pressable>
              <Pressable onPress={() => changeView()} >
                <Entypo name={'list'} size={29} color={!showGrid ? '#dbdbdb' : '#52B788'} />
              </Pressable>
            </View>
      </Animated.View>
      { showGrid ? 
        <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
        style={anims.scrollView}
      >
        {!wishlist.length && <PlaceHolder />}
        {wishlist.map((book) => (
          <Pressable
            key={book.bookId}
            onPress={() => bookDetails(book)}
            onLongPress={() => editStatus(book)}
          >
            <SearchBook book={book} bookList={'all'}/>
          </Pressable>
        ))}
      </Animated.ScrollView> 
      : <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={1}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.mainBook}
          style={anims.scrollView}
        > 
          {!wishlist.length && <PlaceHolder />}
          {wishlist.map((book, index) => (
            <View style={styles.containerBook} key={index}>
              <Pressable
                key={book.bookId}
                onPress={() => bookDetails(book)}
                onLongPress={() => editStatus(book)}
              >
                <MainBook book={book} bookList={'all'} index={index}/>
              </Pressable>
            </View>
          ))}
        </Animated.ScrollView>
      }
    </View>
    </>
  );
}

export default React.memo(BookWishList);
