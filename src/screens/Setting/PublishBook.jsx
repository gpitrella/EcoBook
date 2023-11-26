import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Button from '../../components/Button'
import GoBack from '../../components/GoBack';
import { emailValidator } from '../../utils/emailValidator';
import { passwordValidator } from '../../utils/passwordValidator';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import Animated, {
  interpolate, withTiming, runOnJS, withDelay,
  useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler
} from 'react-native-reanimated';
import * as ImagePicker from "expo-image-picker";
import * as Haptics from 'expo-haptics';
import BookHeader from '../../components/BookHeader';
import { usePutBookMutation, useGetBooksQuery } from "../../services/ecApi";
import { PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import AuthNavigator from "../../navigation/AuthNavigator";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBooks } from "../../redux/slice/homeSlice";
import PublishBookSearch from './PublishBookSearch';


const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function PublishBook({ navigation }) {

  const {
    margin, width, dark, colors, normalize, status, ios,
  } = useTheme();
  const BOOKW = normalize(150, 150);
  const BOOKH = BOOKW * 1.5;
  const dispatch = useDispatch();
  const { data: booksapi, isLoading, isError, error } = useGetBooksQuery();
  const panRef = useRef();
  const [avatarLoad, setAvatarLoad] = useState('');
  const [enabled, setEnabled] = useState(true);
  const HEADER = normalize(width + status, 500) + margin;
  const avatar = 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg';
  const opacity = useSharedValue(1);
  const y = useSharedValue(0);
  const x = useSharedValue(0);
  const moved = useSharedValue(0);
  const closing = useSharedValue(0.9);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  const [putBook, result] = usePutBookMutation();
  const [checkedUser, setCheckedUser] = useState({ user: null, token: null});
  const user = useSelector((state) => state.authSlice.user);
  const idToken = useSelector((state) => state.authSlice.idToken);
  

  useEffect(() => {
    // Generate Random Number
    const date = new Date();  
    const result = date.getTime() / 1000000;
    const randomNumber = Math.random();
    const idBookRef = Math.round(result * randomNumber).toString();
    setNewBook({...newBook, bookId: idBookRef})
  },[]);

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

  const [newBook, setNewBook] = useState({
    "author": {
      "id": 947,
      "isGoodreadsAuthor": false,
      "name": "",
      "profileUrl": "https://www.goodreads.com/author/show/947.William_Shakespeare",
      "worksListUrl": "https://www.goodreads.com/author/list/947.William_Shakespeare",
    },
    "avgRating": "3.74",
    "bookId": "",
    "bookTitleBare": "",
    "bookUrl": "/book/show/18135.Romeo_and_Juliet",
    "description": {
      "fullContentUrl": "https://www.goodreads.com/book/show/18135.Romeo_and_Juliet",
      "html": "",  
      "truncated": true,
    },
    "from_search": true,
    "from_srp": true,
    "imageUrl": avatarLoad !== '' ? avatarLoad : avatar,
    "kcrPreviewUrl": null,
    "numPages": null,
    "qid": "vor8u0qVu8",
    "rank": 1,
    "ratingsCount": null,
    "status": "Completed",
    "title": "",
    "workId": "3349450",
    "user": 'without user'
  });
  
  const onPublishBook = async () => {
    await putBook(newBook);
    Haptics.selectionAsync();
    opacity.value = withDelay(300, withTiming(0));
    navigation.navigate('BookDetails', { book: newBook });
    !isLoading && booksapi !== undefined ? dispatch(setBooks(booksapi)) : null;
  }



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      // setAvatarLoad(`data:image/jpeg;base64,${result.assets[0].base64}`);
      setAvatarLoad(result.assets[0].uri)
      setNewBook({...newBook, imageUrl: result.assets[0].uri})
      // console.log('IMAGEN PNG: ', imageComverted)
      // setNewBook({...newBook, imageUrl: avatarLoad})
      // await putImage({
      //   image: `data:image/jpeg;base64,${result.assets[0].base64}`,
      // });

      // refetch();
    }
  };

// Go back to previous screen
const goBack = () => {
  navigation.goBack();
  Haptics.selectionAsync();
};

// Pan gesture handler
const gestureHandler = useAnimatedGestureHandler({
  onStart: (_, ctx) => {
    ctx.moved = moved.value;
    ctx.startX = x.value;
    ctx.startY = y.value;
  },
  onActive: (e, ctx) => {
    moved.value = ctx.moved + Math.max(e.translationY, e.translationX);
    ctx.velocity = Math.max(e.velocityX, e.velocityY);
    y.value = ctx.startY + e.translationY;
    x.value = ctx.startX + e.translationX;

    // closing screen? do it!
    if ((moved.value >= 75 || ctx.velocity >= 750)) {
      if (closing.value === 0.9) runOnJS(goBack)();
      closing.value = withTiming(0.25);
    }
  },
  onEnd: (e, ctx) => {
    if (moved.value < 75 && ctx.velocity < 750) {
      y.value = withTiming(0);
      x.value = withTiming(0);
      moved.value = withTiming(0);
    }
  },
});

// Scroll handler
const scrollHandler = useAnimatedScrollHandler(({ contentOffset }) => {
  scrollY.value = contentOffset.y;
  if (contentOffset.y <= 0 && !enabled) {
    runOnJS(setEnabled)(true);
  }
  if (contentOffset.y > 0 && enabled) {
    runOnJS(setEnabled)(false);
  }
});

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

const publishMessage = 'Carga fotos de tu libro.'
const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      color: colors.primary,
      fontWeight: 'bold',
      paddingVertical: 12,
      marginBottom: 20
    },
    scrollContainer: {
      paddingTop: HEADER,
      paddingBottom: status + 50,
      margin: 'auto',
      width: '100%',
      paddingHorizontal: 10
    },
    scroll: {
      width: '100%',
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      width: "100%",
      height: 50,
      borderColor: colors.text,
      color: colors.text,
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 0,
      fontSize: 17,
      backgroundColor: '#ececec',
      paddingLeft: 15,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    backBtn: {
      width: '100%',
      position: 'absolute',
      marginTop: 50,
      zIndex: 100,
      top: 0,
    },
    details: { 
      width: '100%',
      textAlign: 'center',
      margin: 'auto',
      justifyContent: 'center',
    },
    topDescription: {
      marginBottom: 0,
      paddingBottom: 0,
      fontSize: 16,
      paddingHorizontal: 10
    }
  })

  return (<>
    { !checkedUser.user && !checkedUser.token ? <AuthNavigator /> : 
    <PanGestureHandler
      ref={panRef}
      failOffsetY={-5}
      failOffsetX={-5}
      activeOffsetY={5}
      activeOffsetX={25}
      onHandlerStateChange={gestureHandler}
    >
      <Animated.View style={anims.screen}>
            <View style={styles.backBtn}> 
              <GoBack navigation={navigation} />
            </View>               
            <BookHeader scrollY={scrollY} book={newBook} pickImage={pickImage} publish={publishMessage}/>     
          <Animated.View style={anims.scrollView}>
            <AnimatedScrollView
              onScroll={scrollHandler}
              scrollEventThrottle={1}
              contentContainerStyle={styles.scrollContainer}
            >    
            <Animated.View style={styles.details}> 
              <Text style={styles.topDescription}>
                Busca el libro que deseas publicar, selecionalo y completa la información faltante para poder publicar tu libro.
              </Text>
              <PublishBookSearch navigation={navigation}/>     
              <TextInput
                placeholder="Precio"
                keyboardType='numeric'
                placeholderTextColor={colors.text}
                style={styles.input}
                value={newBook.ratingsCount}
                onChangeText={(num) => setNewBook({...newBook, ratingsCount: num})}
              />
              <Button mode="contained" onPress={() => onPublishBook(newBook)} style={styles.scroll}>
                Publicar Libro
              </Button>
              </Animated.View> 
            </AnimatedScrollView>
          </Animated.View>            
      </Animated.View>
    </PanGestureHandler> }
   </>)
};

export default React.memo(PublishBook);