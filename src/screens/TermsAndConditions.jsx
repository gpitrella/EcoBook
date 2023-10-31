import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import GoBack from "../components/GoBack";

function TermsAndConditions({ navigation }) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 50
      },
        titleStyle: {
            fontSize: 18,
            color: colors.primary,
            paddingBottom: 10
        },
        contentStyle: {
            color: colors.text,
            fontSize: 15,
            paddingTop: 10,
            paddingBottom: 15,
            lineHeight: 20
        }
    });

    return (
      <View style={styles.screen} >
        <GoBack navigation={navigation}/>
        <ScrollView
          style={{
            padding: 15
          }}
        >
          <Text style={styles.titleStyle}>General Terms</Text>
          <Text style={styles.contentStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s and scrambled it to make a type specimen book.
            It has survived not only five centuries.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s and scrambled it to make a type specimen book.
            It has survived not only five centuries.
          </Text>
          <Text style={styles.contentStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s and scrambled it to make a type specimen book.
            It has survived not only five centuries.
          </Text>
          <Text style={styles.titleStyle}>Privacy Agreement</Text>
          <Text style={styles.contentStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s and scrambled it to make a type specimen book.
            It has survived not only five centuries.
          </Text>
          <Text style={styles.titleStyle}>Personal Data</Text>
          <Text style={styles.contentStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s and scrambled it to make a type specimen book.
            It has survived not only five centuries.
          </Text>
        </ScrollView>
      </View>
    );
}

export default React.memo(TermsAndConditions);