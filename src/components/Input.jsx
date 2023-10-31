import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from '@react-navigation/native';

function Input({ label, placeholder, value, widthHalf }) {
    const { colors, margin } = useTheme();

    const styles = StyleSheet.create({
        InputContainer: {
            height: wp("20%"),
            marginBottom: 0
        },
        labelInput: {
            fontSize: 14,
            fontWeight: "500",
            color: colors.text,
        },
        valueInput: {
            height: wp("11%"),
            fontSize: 18,
            fontWeight: "500",
            paddingVertical: 10,
            paddingLeft: 10,
            color: colors.border,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 4,
            width: widthHalf ? wp("43%") : null,
        },
        touchComponent: {
            flex: 1,
            paddingBottom: 12,
            justifyContent: "flex-end"
        }
    });

  return (
    <View style={styles.InputContainer} >
      <Text style={styles.labelInput} >
        {label}
      </Text>
      <TouchableOpacity style={styles.touchComponent} >
        <TextInput style={styles.valueInput} value={value} placeholder={placeholder} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Input);