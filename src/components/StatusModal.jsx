import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Entypo } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { proxy, useSnapshot } from 'valtio';
import { useSelector } from "react-redux";
import Text from './Text';
import { useToast } from './Toast';
// import { setBookState } from '../BookStore';
import { addBook, updateBook, removeBook } from "../redux/slice/homeSlice";
import { useDispatch } from "react-redux";

// create store using zustant & immer
const state = proxy({
  book: null,
});

// book modal using modalize
export default function StatusModal() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { colors, margin, status } = useTheme();
  const { book } = useSnapshot(state);

  const yourWhishBooks = useSelector((state) => state.homeSlice.yourWhishBooks);
  const yourCarBooks = useSelector((state) => state.homeSlice.yourCarBooks);
  const index = yourWhishBooks.findIndex((b) => b === book?.bookId);
  const indexCar = yourCarBooks.findIndex((b) => b === book?.bookId);

  const ref = useRef();

  // modal styles
  const styles = StyleSheet.create({
    modal: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    content: {
      padding: margin,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingBottom: status,
      backgroundColor: colors.card,
    },
    bookTitle: {
      opacity: 0.5,
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    marginB: {
      marginBottom: margin,
    },
    iconLeft: {
      fontSize: 21,
      color: colors.text,
      marginRight: margin,
    },
    statusText: {
      marginRight: 'auto',
    },
  });

  // close status bottom sheet
  const closeSheet = () => {
    Haptics.notificationAsync('success');
    ref.current?.close();
  };

  // reset state on close
  const onClosed = () => {
    state.book = null;
  };

  // find book to update or remove from list
  const updateList = (list, index, indexCar) => {

    if (index === -1 && indexCar === -1) {
      dispatch(addBook({ bookId: book.bookId, status: list }));
      toast.show(`Book added to ${list}!`);
    } else if (list === 'Remove') {
      dispatch(removeBook({ bookId: book.bookId, status: list }));
      toast.show('Book removed!');
    } else {
      dispatch(updateBook({ bookId: book.bookId, status: list }));
      toast.show(`Book moved to ${list}!`);
    }
    closeSheet();
  };

  useEffect(() => {
    if (book) {
      ref.current?.open();
    }
  }, [book]);

  // if book set, open modal
  useEffect(() => {
    if (book) {
      ref.current?.open();
    }
  }, [book]);

  // find the book in lists
  let item = yourWhishBooks.find((b) => b.bookId === book?.bookId);
  if (!item) item = book;

  return (
    <Modalize
      ref={ref}
      threshold={50}
      onClosed={onClosed}
      modalStyle={styles.modal}
      adjustToContentHeight
    >
      <View style={styles.content}>
        <View style={[styles.flexRow]}>
          <Text bold size={20}>
            {item?.status ? 'Actualizar Lista' : 'Agregar a Lista'}
          </Text>
          <Text bold onPress={closeSheet}>Done</Text>
        </View>
        <Text numberOfLines={1} style={[styles.bookTitle, styles.marginB]}>
          {item?.bookTitleBare}
        </Text>
        {/* <Pressable onPress={() => updateList('Reading')} style={[styles.flexRow, styles.marginB]}>
          <AntDesign name="rocket1" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>Reading</Text>
          <AntDesign size={21} color={colors.text} name={item?.status === 'Reading' ? 'check' : ''} />
        </Pressable> */}
        <Pressable onPress={() => updateList('Shoppinglist', index, indexCar)} style={[styles.flexRow, styles.marginB]}>
          <Entypo name="shopping-cart" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>Agregar al Carrito</Text>
          <AntDesign size={21} color={colors.text} name={indexCar !== -1 ? 'check' : ''} />
        </Pressable>
        <Pressable onPress={() => updateList('Wishlist', index, indexCar)} style={[styles.flexRow, styles.marginB]}>
        <Entypo name="bookmarks" style={styles.iconLeft} />
          <Text size={17} style={styles.statusText}>Agregar a Favoritos</Text>
          <AntDesign size={21} color={colors.text} name={index !== -1 ? 'check' : ''} />
        </Pressable>
        <Pressable onPress={() => updateList('Remove', index, indexCar)}>
          <Text center size={16} color="#ff3b30">Eliminar de Lista</Text>
        </Pressable>
      </View>
    </Modalize>
  );
}

// export dispatch
export const setModal = (book) => {
  state.book = book;
};
