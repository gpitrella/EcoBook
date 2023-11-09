import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, SafeAreaView, Alert } from 'react-native';
import { Avatar, ListItem, Switch } from '@rneui/themed';
import InfoText from './InfoText';
import Entypo from "react-native-vector-icons/Entypo";
import { useTheme } from '@react-navigation/native';
import Button from '../../components/Button';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


function SettingsScreen({ navigation }) {
  const avatar = 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg';
  const name = 'Gabriel Pitrella';
 
  // const [putImage, result] = usePutImageMutation();
  // const { data, isLoading, error, isError, refetch } = useGetImageQuery();
  const [avatarLoad, setAvatarLoad] = useState('');
  const [userStore, setUserStore] = useState('');
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.authSlice.user);
  const {
    margin, width, dark, colors, normalize, status, ios,
  } = useTheme();
  const HEADER = normalize(width + status, 15) + margin;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setAvatarLoad(`data:image/jpeg;base64,${result.assets[0].base64}`);
      refetch();
    }
  };


  const [ pushNotifications, setPushNotifications ] = useState(true);

  const onPressSetting = () => {
    navigation.navigate('Options')
  }

  const onChangePushNotifications = () => {
    setPushNotifications (!pushNotifications);
  }

  const logOut = () => {
    Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
      { text: 'No', style: 'cancel' }, 
      { text: 'Si', onPress: () => handleLogout()}
    ]);
  }

  const handleLogout = () => {
    try {
      dispatch(clearUser());
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const checkStoreUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail")
        const userToken = await AsyncStorage.getItem("userToken")
        userEmail && userToken ? setUserStore(userEmail) : null;
      } catch (error) {
        console.log(error);
      }  
    }
    checkStoreUser();    
    }, [userEmail]);

  // Styles
  const styles = StyleSheet.create({
    scroll: {
      paddingTop: HEADER,
      paddingBottom: status + 50,
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
    },
    userImage: {
      marginRight: 12,
    },
    listItemContainer: {
      height: 'fit-content',
      borderBottomWidth: 0.5,
      borderColor: '#dbdbdb',
      marginBottom: 0,
      marginTop: 0,
      paddingBottom: 0,
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
    listItemDetails:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    scrollBtn: {    
      marginTop: 20,
      marginBottom: 15,
      marginHorizontal: margin
    }   
  })

    return (
      <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Pressable style={styles.containerIcon} onPress={() => pickImage()}>            
              <Avatar
                rounded
                size="large"
                source={{uri: avatarLoad !== '' ? avatarLoad : avatar }}
              />
            </Pressable>
          </View>
          <View>
            <Text style={{ fontSize: 16, color: colors.text }}>{name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {userEmail ? userEmail : userStore }
            </Text>
          </View>
        </View>
        <Button style={styles.scrollBtn} onPress={() => navigation.navigate('publishBook')}>
          Publicar un Libro
        </Button>
        <InfoText text="Cuenta" />
        <View>
          <ListItem style={styles.listItemContainer}>
            <Entypo name={'bell'} size={24} color={'#52B788'} />
            <ListItem.Content style={styles.listItemDetails}>
              <ListItem.Title>Activar Notificaciones</ListItem.Title>
              <Switch
                  color={'#52B788'}
                  onValueChange={() => onChangePushNotifications()}
                  value={pushNotifications}
                />
            </ListItem.Content>
          </ListItem>

          <Pressable onPress={() => navigation.navigate('yourPublishBook')} >
          <ListItem style={styles.listItemContainer}>
            <Entypo name={'archive'} size={24} color={'#52B788'} />
            <ListItem.Content style={styles.listItemDetails} >
              <ListItem.Title>Libros Publicados</ListItem.Title>
              <AntDesign name="right" size={20} color={colors.text} />
            </ListItem.Content>
          </ListItem> 
          </Pressable>

          <ListItem style={styles.listItemContainer}>
            <Entypo name={'briefcase'} size={24} color={'#52B788'} />
            <ListItem.Content style={styles.listItemDetails}>
              <ListItem.Title>Libros Comprados</ListItem.Title>
              <AntDesign name="right" size={20} color={colors.text} />
            </ListItem.Content>
          </ListItem> 

          <ListItem style={styles.listItemContainer}>
            <Entypo name={'cog'} size={24} color={'#52B788'} />
            <ListItem.Content style={styles.listItemDetails}>
              <ListItem.Title>Configuración</ListItem.Title>
              <AntDesign name="right" size={20} color={colors.text} />
            </ListItem.Content>
          </ListItem> 

          <Pressable onPress={() => navigation.navigate('termsAndConditions')} >
            <ListItem style={styles.listItemContainer}>
              <Entypo name={'help-with-circle'} size={24} color={'#52B788'} />
              <ListItem.Content style={styles.listItemDetails}>
                <ListItem.Title>Terminos y Condiciones</ListItem.Title>
                <AntDesign name="right" size={20} color={colors.text} />
              </ListItem.Content>
            </ListItem>
          </Pressable>

          <Pressable onPress={() => logOut()} >
            <ListItem style={styles.listItemContainer}>
              <Entypo name={'log-out'} size={24} color={'#52B788'} />
              <ListItem.Content style={styles.listItemDetails}>
                <ListItem.Title>Cerrar Sesión</ListItem.Title>
                <AntDesign name="right" size={20} color={colors.text} />
              </ListItem.Content>
            </ListItem>
          </Pressable>

        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }

export default React.memo(SettingsScreen);