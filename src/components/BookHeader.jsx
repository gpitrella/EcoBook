/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Image, StyleSheet, FlatList, View, Pressable, ScrollView } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Text from './Text';

// Load a single book
function BookHeader({ scrollY, book, bgsUpload, pickImage, publish, bgUpload }) {
  // const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const {
    width, margin, colors, normalize, navbar, status,
  } = useTheme();
  const BOOKW = normalize(140, 180);
  const BOOKH = BOOKW * 1.5;
  const HEADER = normalize(width + status, 500);
  const scrollX = useSharedValue(0);

  // Animated styles
  const anims = {
    header: useAnimatedStyle(() => ({
      width,
      zIndex: 10,
      height: HEADER,
      paddingTop: status,
      position: 'absolute',
      justifyContent: 'center',
      paddingTop: pickImage ? 100 : 0,
      shadowOffset: { height: 2 },
      backgroundColor: '#0002',
      shadowOpacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [0, 0.25], 'clamp'),
      transform: [
        { translateY: interpolate(scrollY.value, [0, HEADER - navbar], [0, -HEADER + navbar], 'clamp') },
      ],
    })),
    bg: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.5,
      position: 'absolute',
    })),
    cover: useAnimatedStyle(() => ({
      alignItems: 'center',
      opacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [1, 0], 'clamp'),
      transform: [
        { scale: interpolate(scrollY.value, [-100, 0], [1.1, 1], 'clamp') },
        { translateY: interpolate(scrollY.value, [0, HEADER / 6], [0, HEADER / 6], 'clamp') },
      ],
    })),
    title: useAnimatedStyle(() => ({
      paddingTop: margin,
      alignItems: 'center',
      paddingHorizontal: margin * 3,
      opacity: interpolate(scrollY.value, [0, 30], [1, 0], 'clamp'),
    })),
    title2: useAnimatedStyle(() => ({
      left: 0,
      right: 0,
      bottom: 0,
      height: 44,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: margin,
      opacity: interpolate(scrollY.value, [HEADER - navbar - 20, HEADER - navbar], [0, 1], 'clamp'),
    })),
  };

  // go to search screen
  const searchScreen = () => {
    navigation.push('BookSearch');
  };

  // empty list placeholder
  const EmptyList = () => (
    <Pressable onPress={searchScreen} style={styles.emptyContainer}>
      <AntDesign color={colors.text} size={27} name="book" />
      <Text size={16} center style={styles.emptyText}>
        {'I\'m lonely. \n Add something here.'}
      </Text>
    </Pressable>
  );

  // handle horizontal scroll
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollX.value = contentOffset.x;
    },
  });
  const bgUploadStandard = "https://res.cloudinary.com/djgghmpgh/image/upload/v1701201906/BgUpload2_zhzp54.png";
  // Styles
  const styles = StyleSheet.create({
    imgBox: {
      borderRadius: 10,
      elevation: 6,
      shadowRadius: 6,
      shadowOpacity: 0.4,
      shadowOffset: { width: 0, height: 3 },
      margin: 0,
      padding: 0,
    },
    bookImg: {
      width: BOOKW,
      height: BOOKH,
      borderRadius: 10,
      borderWidth: 0,
      borderColor: bgUpload ? '#dbdbdb' : '#fff7',
      marginHorizontal: 10,
      padding: 0,
      backgroundColor: '#fff7'
    },
    author: {
      marginTop: margin / 4,
    },
    listContainer: {
      marginBottom: 0,
      margin: margin,
      flexDirection: 'row',
      padding: 0,
      gap: 20,
      maxHeight: 220,
    },
  });

  return (
    <Animated.View style={anims.header}>
      <Animated.Image blurRadius={15} style={anims.bg} source={{ uri: book.imagesUrl[0] }} />

      <Animated.View style={anims.cover}>
        <SharedElement id={book.bookId}>
          <View style={styles.imgBox}>
          { pickImage ?
            <ScrollView 
              style={styles.listContainer} 
              horizontal
              showsHorizontalScrollIndicator={false} 
            >
              { bgsUpload.map((item, index) => {
                return (
                  <Pressable onPress={() => pickImage(index)} key={index}> 
                      <Image style={styles.bookImg} source={{ uri: item }} />
                  </Pressable> )
              })}                
            </ScrollView>            
            : <ScrollView 
                  style={styles.listContainer} 
                  horizontal
                  showsHorizontalScrollIndicator={false} 
                  >
              { book?.imagesUrl?.map((item, index) => {
                return <Image style={styles.bookImg} source={{ uri: item }} key={index}/>
              })}                
              </ScrollView>
          }
          </View>
        </SharedElement>
      </Animated.View>

      <Animated.View style={anims.title}>
        { publish ? <Text bold center size={18} numberOfLines={2}>{publish}</Text> : null }
        { book.title !== '' && !publish ? <Text bold center size={21} numberOfLines={2}>{book.title}</Text> : null }
        { book.author.name !== '' && !publish ? <Text size={17} style={styles.author}>{`by ${book.author.name}`}</Text> : null }
      </Animated.View>

      <Animated.View style={anims.title2}>
        <Text numberOfLines={1} bold size={17}>
          {book.bookTitleBare}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}



export default React.memo(BookHeader);
