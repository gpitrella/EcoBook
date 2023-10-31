import React, { useState, useEffect } from 'react';
import {
  View, TextInput, Alert, StyleSheet, Pressable, Keyboard,
} from 'react-native';
import Animated, {
  interpolate, Extrapolate, withTiming, useSharedValue, useAnimatedScrollHandler, useAnimatedStyle,
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';
import axios from 'axios';
import Entypo from "react-native-vector-icons/Entypo";
import Text from '../components/Text';
import SearchBook from '../components/SearchBook';
import { useSelector } from "react-redux";
import { setModal } from '../components/StatusModal';
import MainBook from '../components/MainBook';

const stack = require('../anims/stack.json');

// Default screen
function BookSearchScreen({ navigation }) {
  const {
    colors, height, margin, status, navbar,
  } = useTheme();
  const bookList = useSelector((state) => state.homeSlice.books);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const [showGrid, setShowGrid] = useState(true);

    // animate on screen load
  const onLayout = () => {
    loaded.value = withTiming(1);
  };

  // scroll handler
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // go to home screen
  const goBack = () => {
    loaded.value = withTiming(0);
    Haptics.selectionAsync();
    navigation.goBack();
  };

  // view book details
  // hide on current screen
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

  // search query
  useEffect(() => {
    if (query.length > 0) {
      axios.get(`https://www.goodreads.com/book/auto_complete?format=json&q=${query}`)
        .then((resp) => {
          const bks = resp.data.map((book) => ({
            ...book,
            imageUrl: book.imageUrl.replace(/_..../, '_SY475_'),
          }));
          setBooks(bks);
        })
        .catch((error) => {
          Alert.alert('Failed to get books', error);
        });
    }
  }, [query]);

  // animated styles
  const anims = {
    search: useAnimatedStyle(() => ({
      zIndex: 10,
      height: navbar,
      alignItems: 'flex-end',
      flexDirection: 'row',
      paddingTop: status,
      paddingBottom: 6,
      paddingHorizontal: margin / 2,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
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
      color: colors.text
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
    containerTopChange: {
      zIndex: 10,
      flexDirection: 'row',
      paddingTop: 10,
      paddingBottom: 5,
      paddingHorizontal: margin,
      shadowOpacity: interpolate(scrollY.value, [0, 20], [0, 0.75], Extrapolate.CLAMP),
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
    wishlistTitle: {
      fontSize: 17,
      fontWeight: '600',
      marginLeft: 10,
      width: '100%'
    },
  });
  // change View Books
  const changeView = () => {
    if(showGrid) {
      setShowGrid(false);
    } else {
      setShowGrid(true);
    }
  };
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
        You can search by book title, author, keywords etc...
      </Text>
    </View>
  );

  // render search page
  return (
    <View onLayout={onLayout} style={styles.screen}>
      <Animated.View style={anims.search}>
        <SharedElement style={styles.sharedElement} id="search">
          <View size={15} style={styles.searchInput}>
            <View style={styles.searchIcon}>
              <AntDesign color={colors.text} name="search1" size={15} />
            </View>
            <TextInput
              autoFocus
              width="100%"
              value={query}
              autoCorrect={false}
              style={styles.textInput}
              onChangeText={(text) => setQuery(text)}
              placeholder="Find your next book..."
            />
          </View>
        </SharedElement>
        <Pressable onPress={goBack}>
          <Text bold style={styles.saveButton}>Done</Text>
        </Pressable>
      </Animated.View>
      {books.length > 0 && 
      <Animated.View style={styles.containerTopChange}>
        <View style={styles.rowItem}>
          <Entypo name={'magnifying-glass'} size={24} color={'#52B788'} />
          <Text style={styles.wishlistTitle}>
            Resultados busqueda
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
      </Animated.View> }

      { showGrid ? 
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
        style={anims.scrollView}
      >
        {!books.length && <PlaceHolder />}      
        {books.map((book) => (
          <Pressable
            key={book.bookId}
            onPress={() => bookDetails(book)}
            onLongPress={() => editStatus(book)}
          >
            <SearchBook book={book} bookList={bookList}/>
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
      {books.map((book, index) => (
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
    </Animated.ScrollView> }
    </View>
  );
}

export default React.memo(BookSearchScreen);
