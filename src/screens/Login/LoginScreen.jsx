import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Logo from '../../components/Logo';
import Button from '../../components/Button'
import GoBack from '../../components/GoBack';
import { useTheme } from '@react-navigation/native';
import { firebase_auth } from "../../firebase/firebase_auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIdToken, setUser } from "../../redux/slice/authSlice";

function LoginScreen({ navigation }) {
  
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: '' })
  const [password, setPassword] = useState({ value: '' })
  const [error, setError] = useState({ error: false })

  const handleLogin = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      dispatch(setUser(response.user.email));
      dispatch(setIdToken(response._tokenResponse.idToken));
    } catch (error) {
      setError({ error: true })
    }
  };

  const onLoginPressed = () => {
    handleLogin(email.value, password.value)
  }

  const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      color: colors.primary,
      fontWeight: 'bold',
      paddingVertical: 12,
      marginBottom: 20
    },
    forgotPassword: {
      width: '85%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 14,
      color: colors.text,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      margin: 'auto',
      backgroundColor: colors.background,
      paddingTop: 0,
      width: '100%',
      height: '100%',
      maxWidth: 360,
      alignSelf: 'center',
      alignItems: 'center',
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    scroll: {
      width: '85%',
      marginTop: 0,
      marginBottom: 10,
    },
    input: {
      width: "85%",
      height: 50,
      borderColor: colors.textDark,
      color: colors.textDark,
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 0,
      fontSize: 17,
      backgroundColor: '#ececec',
      paddingLeft: 15,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    backBtn: {
      width: '100%',
      position: 'absolute',
      marginTop: 50,
      top: 0,
    },
    wrongData: {
      color: colors.error,
      paddingHorizontal: 25,
      width: '100%',
      paddingBottom: 10,
    }
  })

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backBtn}> 
        <GoBack navigation={navigation} />
      </View>       
      <View style={styles.mainContainer}>   
        <Logo />
        <Text style={styles.header} >Iniciar Sesión</Text>
        <TextInput
            label={"Nombre"}
            placeholder="Nombre de usuario"
            placeholderTextColor={colors.textDark}
            style={styles.input}
            value={email.value}
            onChangeText={(text) => setEmail({value: text })}
          />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.textDark}
          secureTextEntry
          style={styles.input}
          value={password.value}
          onChangeText={(text) => setPassword({value: text })}
        />
        { error.error ? <Text style={styles.wrongData}>Email o Contraseña incorrecto</Text> : null }
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
          >
            <Text style={styles.forgot}>Olvidaste el Password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed} style={styles.scroll}>
          Iniciar Sesión
        </Button>
        <View style={styles.row}>
          <Text style={styles.forgot}>Todavia no tienes cuenta?  </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.link}> Registrarse</Text>
          </TouchableOpacity>
       </View>
    </View>           
  </View>
  )
};

export default React.memo(LoginScreen);