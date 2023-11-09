import React, { useState, useEffect } from 'react';
import { View, Pressable, Keyboard } from 'react-native';
import Animated, {
  interpolate, withTiming,
  useAnimatedStyle, useSharedValue, useAnimatedScrollHandler, useAnimatedProps,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Text from '../components/Text';
import BookList from '../components/BookList';
import BookGenre from '../components/BookGenre';
import MainBook from '../components/MainBook';
import { useSelector } from "react-redux";
import { useGetGenresQuery } from "../services/ecApi";
import { setModal } from '../components/StatusModal';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Entypo } from "@expo/vector-icons";

const studies = require('../anims/landscape.json');

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

// Get morning, afternoon, evening
const getGreeting = () => {
  const hours = (new Date()).getHours();
  if (hours < 12) { return 'Buen día'; }
  if (hours >= 12 && hours <= 17) { return 'Buenas Tardes'; }
  return 'Buenas Noches';
};

// home screen
function BookListScreen({ navigation }) {
  const {
    dark, width, height, colors, margin, navbar, normalize, ios,
  } = useTheme();
  const { data: genres, isLoading, isError, error } = useGetGenresQuery();
  const [ dataGenres, setDataGenres ] = useState([]);
  const [ lastBooks, setLastBooks ] = useState([]);
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const books = useSelector((state) => state.homeSlice.books);
  const yourWhishBooks = useSelector((state) => state.homeSlice.yourWhishBooks);
  const yourCarBooks = useSelector((state) => state.homeSlice.yourCarBooks);

  // Find yourBooks
  const wishlist = books ? books.filter(item => yourWhishBooks.includes(item.bookId)) : [];
  const yourCars = books ? books.filter(item => yourCarBooks.includes(item.bookId)) : [];

  // fade in screen, slowly if light mode is on
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  // scrollview handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  // go to search screen
  const searchBooks = () => {
    Haptics.selectionAsync();
    navigation.push('BookSearch', { bookList: books });
  };

  useEffect(() => {
    !isLoading && genres !== undefined ? setDataGenres(genres) : null; 
    if (books) {
      const reversed = [...books].slice(books.length - 20).reverse();
      setLastBooks(reversed);
    }  
  }, [isLoading, books]);

  // all the styles
  const styles = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: loaded.value,
      backgroundColor: colors.card,
    })),
    header: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: navbar,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
      height: interpolate(scrollY.value, [-HEADER, 0], [HEADER * 2, HEADER], 'clamp'),
      elevation: ios ? undefined : interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 10], 'clamp'),
      shadowOpacity: ios ? interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [0, 0.75], 'clamp') : undefined,
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER - navbar], [0, -HEADER + navbar], 'clamp') },
      ],
    })),
    logo: useAnimatedStyle(() => ({
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [-HEADER, 0], [-HEADER / 2, 0], 'clamp') },
      ],
    })),
    lottie: {
      top: 5,
      height: '100%',
      opacity: dark ? 0.8 : 1,
    },
    lottieProps: useAnimatedProps(() => ({
      speed: 0.5,
      autoPlay: true,
    })),
    welcomeText: useAnimatedStyle(() => ({
      marginBottom: margin / 2,
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0]),
    })),
    searchInput: useAnimatedStyle(() => ({
      borderRadius: 25,
      marginHorizontal: 20,
      paddingHorizontal: margin,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: interpolate(scrollY.value + 30, [HEADER - navbar, HEADER - navbar + 40], [20, -20], 'clamp'),
      backgroundColor: colors.card,
      borderColor: colors.background,
      marginBottom: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [-25, 6], 'clamp'),
      height: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [50, 38], 'clamp'),
      width: interpolate(scrollY.value + 30, [HEADER - navbar, HEADER - navbar + 40], [width - margin * 2, width - margin * 4], 'clamp'),
      borderWidth: interpolate(scrollY.value, [HEADER - navbar, HEADER - navbar + 30], [1, 0], 'clamp'),
    })),
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    searchText: {
      height: 38,
      width: '100%',
      opacity: 0.25,
      lineHeight: 38,
      fontSize: 15,
    },
    scrollView: {
      paddingTop: HEADER,
    },
    mainBook: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginLeft: 20,
      marginRight: 20,
      alignContent: 'space-around'
    },
    containerBook: {
      width: '50%',
      marginBottom: 20
    },
    topIcon: {
      position: 'absolute',
      zIndex: 100,
      top: 35,
      right: 20,
    }
  };
  // show WishBook screen
  const bookWishList = () => {
    Haptics.selectionAsync();
    navigation.push('WishList');
  };

  // view book details
  // hide on current screen
  const bookDetails = (book) => {
    Haptics.selectionAsync();
    navigation.push('BookDetails', { book });
  };

  // edit selected book
  const editStatus = (book) => {
    setModal(book);
    Keyboard.dismiss();
    Haptics.selectionAsync();
  };
  // filter books into their categories
  // const reading = books.filter((b) => b.status === 'Reading');
  // const completed = books.filter((b) => b.status === 'Completed');
  // const wishlist = books.filter((b) => b.status === 'Wishlist');
 
  // render all the lists
  return (
    <Animated.View onLayout={onLayout} style={styles.screen}>
      <View style={styles.topIcon}>
        <Pressable onPress={bookWishList}>
          <Entypo
            name="bookmarks"
            size={30}
            color={colors.primary}
          />
        </Pressable>
      </View>
      <Animated.View style={styles.header}>
        <Animated.View style={styles.logo}>
        { Platform.OS != 'web' ? <LottieViewAnimated
            source={studies}
            style={styles.lottie}
            animatedProps={styles.lottieProps}
          /> : <></> }
        </Animated.View>
        <Text animated style={styles.welcomeText} center size={20}>
          {getGreeting()}
        </Text>
        <Pressable onPress={searchBooks}>
          <SharedElement id="search">
            <Animated.View size={15} style={styles.searchInput}>
              <View style={styles.searchIcon}>
                <AntDesign color={colors.text} name="search1" size={15} />
              </View>
              <Text style={styles.searchText}> Encontra tu próximo libro...</Text>
            </Animated.View>
          </SharedElement>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollView}
      >
        <BookList books={lastBooks} title="Ultimos libros publicados" />
        <View style={styles.mainBook}>
          {books?.map((book, index) => (
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
        </View>
        <BookGenre genres={dataGenres} title="Buscar por Genero" />
        { yourCars[0] ? <BookList books={yourCars} title="Agregados al Carrito" /> : null }
        { wishlist[0] ? <BookList books={wishlist} title="Tus Favoritos" /> : null }
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default React.memo(BookListScreen);
