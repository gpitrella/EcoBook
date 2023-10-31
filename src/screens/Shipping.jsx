import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ShippingPartner from "../components/ShippingPartner";
import { useTheme } from '@react-navigation/native';
import GoBack from "../components/GoBack";
import SearchBook from '../components/SearchBook';

function Shipping({ navigation, route }) {
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
            borderBottomWidth: 1,
            borderBottomColor: "gray"
        },
        rowItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 5
        },
        wishlistTitle: {
            fontSize: 17,
            fontWeight: '600',
            color: colors.primary,
        },
        textStyles: {
            paddingHorizontal: 15,
        },
        detailsText: {
            marginTop: 0
        },
        descriptionShipping: {
            paddingVertical: 15,
            flex: 1,
            paddingHorizontal: 15
        },
        descriptionText: {
            color: colors.text,
            fontWeight: '600',
            fontSize: 14,
            marginBottom: 15
        },
        detailDirection: {
            fontSize: 14,
            color: colors.text,
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
            Método de Envío
       </Text>
       <KeyboardAwareScrollView>
        <View style={styles.containerContainer}>
          <View style={styles.textStyles} >
          <SearchBook book={book} bookList={'all'}/>
            <View style={styles.detailsText} >
              <Pressable onPress={() => navigation.push('Payment', { book })}>
                <ShippingPartner
                  imageUri={require("../../assets/logo_1.jpg")}
                  name="DHL"
                  description="No additional Costs"
                />
              </Pressable>
              <Pressable onPress={() => navigation.push('Payment', { book })}>
                <ShippingPartner
                  imageUri={require("../../assets/logo_2.jpg")}
                  name="UPS"
                  description="No additional Costs"
                />
              </Pressable>
              <Pressable onPress={() => navigation.push('Payment', { book })}>
              <ShippingPartner
                imageUri={require("../../assets/logo_3.png")}
                name="FEDEX EXPRESS"
                description="Additional 12.99 $"
              />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.descriptionShipping} >
          <Text style={styles.descriptionText} >
            Dirección de Envío:
          </Text>
          <Text style={styles.detailDirection}>
            Johnny Doe
          </Text>
          <Text style={styles.detailDirection}>
            11144 Military Trail (North)
          </Text>
          <Text style={styles.detailDirection}>
            Apartment #3122, 23122 Palo Alot
          </Text>
          <Text style={styles.detailDirection}>
            California, United States
          </Text>
        </View>
        </KeyboardAwareScrollView>
      </View>
    );
}

export default React.memo(Shipping);