import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from '../components/Button';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import GoBack from "../components/GoBack";
import { useTheme } from '@react-navigation/native';

function Address({ navigation, route }) {
    const { colors, margin } = useTheme();

    const { book } = route.params;
    const styles = StyleSheet.create({
        mainAddresContainer: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 50,
            position: 'relative',
        },
        containerAddresContainer: {
            flex: 1,
            paddingBottom: 15,
            paddingHorizontal: 15,
            marginTop: 20
        },
        inputs: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
        },
        optionsInputs: {
            color: "gray",
            fontSize: 14,
            paddingBottom: 5
        },    
        scroll: {
            marginHorizontal: margin,
            marginTop: 25,
            marginBottom: 10,
        },
        contentTitleBack: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
            paddingLeft:0
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
      <View style={styles.mainAddresContainer} >
          <GoBack navigation={navigation}/>
          <Text style={styles.wishlistTitle}>
              Dirección de Envio
          </Text>
        <View style={styles.containerAddresContainer} >
          <KeyboardAwareScrollView>
            <View style={styles.inputs} >
              <Input label="Nombre" value="Johnny" widthHalf={true} />
              <Input label="Apellido" value="Doe" widthHalf={true} />
            </View>
            <Input label="Dirección" value="11144 Military Trail (North)" />
            <Input label="Piso / Dpto" value="Apartment #3122" />
            <View style={styles.inputs} >
              <Input label="Ciudad" value="Palo Alto" widthHalf={true} />
              <Input label="Código Postal" value="23122" widthHalf={true} />
            </View>
            <View style={styles.inputs} >
              <Input label="Provincia" value="CABA" widthHalf={true} />
              <Input label="País" value="Argentina" widthHalf={true} />
            </View>
            <Text style={styles.optionsInputs} >
              Opciones de Envío
            </Text>
            <Text style={styles.optionsInputs} >
              Enviar a otra dirección
            </Text>
            <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <Button onPress={() => navigation.push('Shipping', { book })} style={styles.scroll}>
                Continuar
            </Button>
          </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
}

export default React.memo(Address);