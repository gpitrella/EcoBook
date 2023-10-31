import React from 'react';
import { Text, StyleSheet, View } from "react-native";
import Logo from '../../components/Logo';
import Button from '../../components/Button'
import { useTheme } from '@react-navigation/native';

function StartScreen({ navigation }) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        header: {
            fontSize: 21,
            color: colors.primary,
            fontWeight: 'bold',
            paddingVertical: 12,
        },
        text: {
            fontSize: 15,
            lineHeight: 21,
            textAlign: 'center',
            marginBottom: 12,
            color: colors.text,
        },
        mainContainer: {
          flex: 1,
          justifyContent: 'center',
          margin: 'auto',
          backgroundColor: colors.background,
          paddingTop: 0,
          width: '100%',
          maxWidth: 340,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
      },
      scroll: {
        width: '100%',
        marginTop: 20
      }
    })

  return (
    <View style={styles.mainContainer}>
      <Logo />
      <Text style={styles.header}>Debes iniciar sesión para continuar</Text>
      <Text style={styles.text}>La forma mas simple de leer y cuidar el planeta.</Text>
      <Button onPress={() => navigation.navigate('login')} style={styles.scroll}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('register')} style={styles.scroll}>
        Sign Up
      </Button>
    </View >
  )
};

export default React.memo(StartScreen);