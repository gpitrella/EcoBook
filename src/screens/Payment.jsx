import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ShippingPartner from "../components/ShippingPartner";
import { useTheme } from '@react-navigation/native';
import GoBack from "../components/GoBack";
import SearchBook from '../components/SearchBook';

function Payment({ navigation, route }) {
    const { colors, margin } = useTheme();
    const { book } = route.params;

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 50,
        },
        containerContainer: {
            width: "100%",
            marginTop: 20,
        },
        rowItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 5
        },
        textStyles: {
            paddingHorizontal: 15,
        },
        detailsText: {
            marginTop: 0
        },
        bottomButton: {
            flex: 1,
            justifyContent: "flex-end"
        },
        wishlistTitle: {
          fontSize: 20,
          fontWeight: '600',
          color: colors.text,
          paddingLeft: 60,
          top:50,
          width:'100%',
          alignItems: 'center',
          textAlign: 'left',
          position: 'absolute'
      }
    });

    return (
      <View style={styles.mainContainer}>
        <GoBack navigation={navigation}/>
        <Text style={styles.wishlistTitle}>
            Método de Pago
       </Text>
        <View style={styles.containerContainer}>
          <View style={styles.textStyles} >
          <SearchBook book={book} bookList={'all'}/>
            <View style={styles.detailsText} >
              <Pressable onPress={() => navigation.push('Address', { book })}>
                <ShippingPartner
                  imageUri={require("../../assets/logoMP.png")}
                  name="Mercado Pago"
                  description=""
                />
              </Pressable>
              <Pressable onPress={() => navigation.push('Address', { book })}>
                <ShippingPartner
                  imageUri={require("../../assets/visa.png")}
                  name="Tarjeta de Credito"
                  description=""
                />
              </Pressable>
              <Pressable onPress={() => navigation.push('Address', { book })}>
              <ShippingPartner
                imageUri={require("../../assets/master.png")}
                name="Tarjeta de Debito"
                description=""
              />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
}

export default React.memo(Payment);