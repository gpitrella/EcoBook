import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Text from './Text';

// Themeable Button
function ThemedButton({
  onPress, style, textStyle, children,
}) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    button: {
      height: 50,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowRadius: 0,
      shadowOpacity: 1,
      shadowColor: colors.primary,
      shadowOffset: { width: 3, height: 3 },
      backgroundColor: colors.button,
      width: 'max-content',
    },
    textBtn: {
      fontWeight: 700,
      color: '#fff'
    }
  });

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text bold size={16} style={[styles.textBtn, textStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

export default React.memo(ThemedButton);
