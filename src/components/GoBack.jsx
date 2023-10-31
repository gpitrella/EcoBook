import React from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 

// Go Back Button
function GoBack({ navigation }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
      rowItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          paddingLeft: 15,
          zIndex: 10,
          width: '20%',
      },
      wishlistTitle: {
          fontSize: 17,
          fontWeight: '600',
          color: colors.primary,
      }
  });

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.rowItem}>
        <AntDesign name="arrowleft" size={26} color="#52B788" />
    </Pressable>
  );
}

export default React.memo(GoBack);
