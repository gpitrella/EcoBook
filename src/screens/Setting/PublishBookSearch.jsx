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
import Text from '../../components/Text';
import SearchPublish from '../../components/SearchPublish';
import { useSelector } from "react-redux";
import { setModal } from '../../components/StatusModal';

const stack = require('../../anims/stack3.json');

// Default screen
function PublishBookSearch({ navigation, setYourSelectedBook }) {
  const {
    colors, height, margin, status, navbar,
  } = useTheme();
  const bookList = useSelector((state) => state.homeSlice.books);
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [yourBook, setYourBook] = useState({});
  const [selectedBook, setSelectedBook] = useState(false);
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

  // go to home screen
  const goBack = () => {
    loaded.value = withTiming(0);
    Haptics.selectionAsync();
    navigation.goBack();
  };

  // hide on current screen
  const selectBook = (book) => {
    Haptics.selectionAsync();
    setSelectedBook(true);
    setYourBook(book);
    setYourSelectedBook(book);
  };

  const deSelectBook = () => {
    Haptics.selectionAsync();
    setSelectedBook(false);
    setYourBook({});
  };

  // search query
  useEffect(() => {
    if (query.length > 0) {
      // const bks = booksStore.filter((book) => book.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || book.author.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || book.description.html.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      // setBooks(bks);
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
      marginTop: 0,
      paddingTop: 0,
      paddingBottom: 6,
      paddingHorizontal: margin / 4,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      position: 'relative',
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
      opacity: 0.7,
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
      marginTop: margin,
      marginBottom: 50,
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
      padding: margin /2,
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
    wishlistTitle: {
      fontSize: 17,
      fontWeight: '600',
      marginLeft: 10,
      width: '100%'
    },
    changeBook: {
      width: '100%',
      textAlign: 'right',
      marginBottom: 20,
      marginTop: 10,
      fontSize: 16,
      paddingRight: 5
    }
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
        Puedes buscar por titulo del libro, Autor, palabra clave, etc...
      </Text>
    </View>
  );

  // render search page
  return (
    <View onLayout={onLayout} style={styles.screen}>
      { !selectedBook ? 
        <Animated.View style={anims.search}>
          <SharedElement style={styles.sharedElement} id="search">
            <View size={15} style={styles.searchInput}>
              <View style={styles.searchIcon}>
                <AntDesign color={colors.text} name="search1" size={15} />
              </View>
              <TextInput                
                width="100%"
                value={query}
                autoCorrect={false}
                style={styles.textInput}
                onChangeText={(text) => setQuery(text)}
                placeholder="Busca tu libro..."
              />
            </View>
          </SharedElement>
        </Animated.View> 
      : null }
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
        style={anims.scrollView}
      >
        {!books.length && <PlaceHolder />}      
        {!yourBook.bookId && books.map((book) => (
            <Pressable
              key={book.bookId}
              onPress={() => selectBook(book)}
            >
              <SearchPublish book={book} bookList={bookList} selectedBook={selectedBook}/>
            </Pressable>          
        ))}
         {yourBook.bookId && 
          <>
            <SearchPublish book={yourBook} bookList={bookList} selectedBook={selectedBook}/>
            <Pressable
              key={yourBook.bookId}
              onPress={() => deSelectBook(yourBook)}
            >              
                <Text bold style={styles.changeBook}>Cambiar Libro</Text>
            </Pressable>     
          </>     
        }
      </Animated.ScrollView> 
    </View>
  );
}

export default React.memo(PublishBookSearch);
