import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Text from '../components/Text';

// Import lottie animation
const lottie = require('../anims/reading.json');

// Default screen
function Charging({ navigation }) {
  const { colors, margin, normalize } = useTheme();
    
  // Styles
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
    },
    scroll: {
      paddingVertical: margin,
      paddingHorizontal: margin * 2,
    },
    lottie: {
      alignSelf: 'center',
      marginRight: margin / 2,
      width: 100
      // width: normalize(320, 400),
    },
    title: {
      fontSize: 40,
      lineHeight: 50,
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
      <Text center style={styles.subTitle}>
        Cargando ...
      </Text>
    </ScrollView>
  );
}

export default React.memo(Charging);
