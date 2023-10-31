import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
// import { TextInput as Input } from 'react-native-paper'
import { useTheme } from '@react-navigation/native';
import Input from "../components/Input";

export default function TextInput({ errorText, description, ...props }) {
  const { colors, margin } = useTheme();
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={'#000'}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 0,
  },
  input: {
    backgroundColor: '#dbdbdb',
  },
  description: {
    fontSize: 13,
    color: '#000',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: '#000',
    paddingTop: 8,
  },
})