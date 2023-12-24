import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import Button from '../../components/Button'
import GoBack from '../../components/GoBack';
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
import { AntDesign } from '@expo/vector-icons';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function PublishBookSecond({ navigation, route }) {
  const { yourBook } = route.params;

  const {
    margin, width, dark, colors, normalize, status, ios,
  } = useTheme();
  const BOOKW = normalize(150, 150);
  const BOOKH = BOOKW * 1.5;
  const dispatch = useDispatch();
  const { data: booksapi, isLoading, isError, error } = useGetBooksQuery();
  const panRef = useRef();
  const [enabled, setEnabled] = useState(true);
  const HEADER = normalize(width + status, 500) + margin;
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
  const [showButton, setShowButton] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ error: '' });
  const [bgsUpload, setBgsUpload] = useState([
    { uri: "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png", type: 'image', name: 'initial' },
    { uri: "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png", type: 'image', name: 'initial' },
    { uri: "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png", type: 'image', name: 'initial' },
    { uri: "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png", type: 'image', name: 'initial' }
  ])
  // const [finalPhoto, setFinalPhoto] = useState([]);

  const bgUpload = "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png";

  useEffect(() => {
    if (yourBook.bookId) {
      setNewBook({...newBook, 
        bookId: yourBook.bookId,
        avgRating: yourBook.avgRating,
        title: yourBook.title,
        author: { ...newBook.author, id: yourBook.author.id, name: yourBook.author.name },
        imagesUrl: bgsUpload.filter((element) => element.uri !== bgUpload),
        seller: user  
      })
    }
  },[yourBook, bgsUpload]);

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
      "name": ''
    },
    "avgRating": "3.74",
    "bookId": '',
    "imageUrl": '',
    "imagesUrl": [],
    "price": '',
    "seller": '',
    "status": 'processing',
    "condition": 'good'
  });
  
  // const uploadImages = async(e) => {
  //   const finalPhoto = bgsUpload.filter((element) => element.uri !== bgUpload)
  //   { finalPhoto.map((photo, index) => {
  //      cloudinaryUpload(photo, index);
  //   })}  
  // }

  // const onPublishBook = async () => {
  //   await putBook(newBook);
  //   Haptics.selectionAsync();
  //   opacity.value = withDelay(300, withTiming(0));
  //   navigation.navigate('BookDetails', { book: newBook });
  //   !isLoading && booksapi !== undefined ? dispatch(setBooks(booksapi)) : null;
  // }

  // const cloudinaryUpload = async (photo, index) => {
  //   const finalPhoto = bgsUpload.filter((element) => element.uri !== bgUpload)
  //   const data = new FormData()
  //   data.append('file', photo)
  //   data.append('upload_preset', 'djgghmpgh')
  //   data.append("cloud_name", "djgghmpgh")
  //   await fetch("https://api.cloudinary.com/v1_1/djgghmpgh/image/upload", {
  //     method: "post",
  //     body: data
  //   }).then(res => res.json()).
  //     then(data => {
  //       finalPhoto.splice(index, 1)  
  //       finalPhoto.splice(index, 0, data.secure_url)
  //       setFinalPhoto([...finalPhoto])  
  //       if(finalPhoto.length === finalPhoto.length) {
  //         onPublishBook()
  //       }
  //     }).catch(err => {
  //       Alert.alert("An Error Occured While Uploading")
  //     })
  // }
  console.log('NEW BOOK SECOND: ', newBook)
  const pickImage = async (index) => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
        const uri = result.assets[0].uri;
        const type = result.assets[0].type;
        const name = result.assets[0].fileName ? result.assets[0].fileName: 'newPhoto';
        const source = { uri, type, name };
        bgsUpload.splice(index, 1);  
        bgsUpload.splice(index, 0, source);
        setBgsUpload([...bgsUpload]);
        checkerPublish();      
    }
};

const checkerPublish = () => {
  const countImages = bgsUpload.filter((element) => element.uri !== bgUpload)
  if(countImages.length === 0) { 
    setErrorInfo({ error: "Debes cargar las fotos de tu libro." })
    setShowButton(true) 
  }
  else { 
    setErrorInfo({ error: "" })
    setShowButton(true)
  }
}

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
      paddingTop: HEADER - 10,
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
      paddingTop: 50,
      zIndex: 100,
      top: 0,
      backgroundColor: '#fff'
    },
    details: { 
      width: '100%',
      textAlign: 'center',
      margin: 'auto',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    topDescription: {
      marginBottom: 0,
      paddingBottom: 10,
      fontSize: 16,
      paddingHorizontal: 20,
      paddingTop: 0,
      backgroundColor: '#fff',
      display: 'flex',
      gap: 50
    },
    infoDetails: {
      padding: 10,
      marginBottom: 20,
      marginTop: 0,
      backgroundColor: colors.card,
      borderRadius: 10,
      opacity: 1,
      zIndex: 100
    },
    iconInfo: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    info: {
      fontSize: 16,
    },
    errorDetails: {
      paddingBottom: 10,
      fontSize: 16,
      color: colors.error
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
              <Text style={styles.topDescription}>
                Carga las fotos de tu libro Portada, contratapa y foto de detalles importantes. 
                Completa a continuación la información para la publicación.
              </Text>             
            </View>  
            <BookHeader scrollY={scrollY} book={newBook} bgsUpload={bgsUpload} pickImage={pickImage} publish={publishMessage} bgUpload={bgUpload} />     
          <Animated.View style={anims.scrollView}>
            <AnimatedScrollView
              onScroll={scrollHandler}
              scrollEventThrottle={1}
              contentContainerStyle={styles.scrollContainer}
            >    
            <Animated.View style={styles.details}>  
              <View style={styles.infoDetails}>                
                <Text style={styles.info}><AntDesign name="infocirlceo" size={16} style={styles.iconInfo} /> Te recomendamos subir las fotos con buena iluminación y claras, subir una 
                 foto de la Portada, una foto de la contratapa y contas con dos fotos más para que puedas mostrar el interior del libro o algún detalle que consideres de importancia. 
                 Debes cargar al menos una foto para continuar.
                </Text>
              </View>    
              { errorInfo.error != '' && 
              <Text style={styles.errorDetails}>
                *{ errorInfo.error }
              </Text> }
              { showButton && 
              <Button mode="contained" onPress={() => navigation.navigate('PublishBookThird', { newBook })} style={styles.scroll}>
                Continuar 
              </Button> }
              </Animated.View> 
            </AnimatedScrollView>
          </Animated.View>            
      </Animated.View>
    </PanGestureHandler> }
   </>)
};

export default React.memo(PublishBookSecond);