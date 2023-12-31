import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Text from '../components/Text';
import Button from '../components/Button';
import { useDispatch } from "react-redux";
import { setFirstAccess } from "../redux/slice/homeSlice";

// Import lottie animation
const lottie = require('../anims/booksAnim.json');

// Default screen
function Books({ navigation }) {
  const { colors, margin, normalize } = useTheme();
  
  const dispatch = useDispatch();
  
  const getStart = () => {
    dispatch(setFirstAccess(true))
    navigation.push('BookList')
  }
  // Styles
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.backgroundColor,
    },
    scroll: {
      paddingVertical: margin,
      paddingHorizontal: margin * 2,
    },
    lottie: {
      alignSelf: 'center',
      marginRight: margin / 2,
      width: normalize(320, 400),
    },
    title: {
      fontSize: 32,
      lineHeight: 36,
      fontWeight: '700',
      marginTop: margin * 2,
    },
    subTitle: {
      fontSize: 17,
      fontWeight: '500',
      marginTop: margin,
      marginBottom: margin * 2,
    },
  });

  return (
    <ScrollView style={styles.screen} centerContent contentContainerStyle={styles.scroll}>
      <LottieView autoPlay loop style={styles.lottie} source={lottie} />
      <Text bold center style={styles.title}>
        {'Bienvenido a Recircula tus Libros'}
      </Text>
      <Text center style={styles.subTitle}>
        Encontra todos los libros que buscas y colabora con el planeta.
      </Text>
      <Button onPress={() => getStart()}>
        Empezar
      </Button>
    </ScrollView>
  );
}

export default React.memo(Books);
