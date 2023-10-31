import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 

function ShippingPartner ({ navigation, imageUri, name, description }) {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderTopColor: '#dbdbdb',
      borderTopWidth: 0.2
    },
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    mainView: {
      width: wp("4.3%"),
      height: wp("4.3%"),
      borderWidth: 1,
      borderColor: "gray",
      marginRight: 10,
      
    },
    mainViewImage: {
      width: wp("15%"),
      height: wp("15%"),
    },
    containerImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: "cover",
      borderRadius: 500,
      backgroundColor: "#fff",
    },
    textContainer: {
      flex: 1,
      alignItems: "flex-start",
      paddingLeft: 20
    },
    textMain: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold"
    },
    description: {
      fontSize: 12,
      color: "gray"
    }

  });
    return (
      <View style={styles.mainContainer} >
        <View >
          <View style={styles.mainViewImage} >
            <Image style={styles.containerImage} source={imageUri} />
          </View>
        </View>
        <View style={styles.textContainer} >
          <Text style={styles.textMain}>
            {name}
          </Text>
          { description ? 
          <Text style={styles.description} >
            {description}
          </Text> : null }        
        </View>
        <AntDesign name="right" size={20} color={colors.text} />
      </View>
    );
}
export default React.memo(ShippingPartner);
