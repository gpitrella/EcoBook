/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Book from './Book';

// star rating
// const Rating = React.memo(({ rating }) => (
//   <View style={{ width: 90, flexDirection: 'row', justifyContent: 'space-between' }}>
//     <FontAwesome size={16} name={rating < 0.5 ? 'star-o' : rating < 0.5 ? 'star-half-o' : 'star'} color="#f39c12" />
//     <FontAwesome size={16} name={rating < 1.5 ? 'star-o' : rating < 1.5 ? 'star-half-o' : 'star'} color="#f39c12" />
//     <FontAwesome size={16} name={rating < 2.5 ? 'star-o' : rating < 2.5 ? 'star-half-o' : 'star'} color="#f39c12" />
//     <FontAwesome size={16} name={rating < 3.5 ? 'star-o' : rating < 3.5 ? 'star-half-o' : 'star'} color="#f39c12" />
//     <FontAwesome size={16} name={rating < 4.5 ? 'star-o' : rating < 4.5 ? 'star-half-o' : 'star'} color="#f39c12" />
//   </View>
// ));

// render search screen book
function MainBook({ book, bookList, index }) {
  // const { margin, normalize } = useTheme();
  // const BOOKW = normalize(120, 150);
  // const BOOKH = BOOKW * 1.5;
  const item = bookList === 'all' ? book : bookList.find((b) => b.bookId === book.bookId);
  const scrollX = useSharedValue(0);

  // styles
  // const styles = {
  //   bookBox: {
  //     flexDirection: 'row',
  //     marginBottom: margin * 1.5,
  //   },
  //   imgBox: {
  //     borderRadius: 10,
  //     shadowRadius: 6,
  //     shadowOpacity: 0.3,
  //     shadowOffset: { width: 0, height: 6 },
  //   },
  //   bookImg: {
  //     width: BOOKW,
  //     height: BOOKH,
  //     borderRadius: 10,
  //   },
  //   bookDetails: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     paddingLeft: margin * 1.5,
  //   },
  //   bookAuthor: {
  //     marginVertical: margin / 4,
  //   },
  // };

  // render serach book
  return (
    <Book book={item} index={index} scrollX={scrollX} /> 
    );
}

export default React.memo(MainBook);
