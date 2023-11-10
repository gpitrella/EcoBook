import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Logo from '../../components/Logo';
import Button from '../../components/Button'
import GoBack from '../../components/GoBack';
import { emailValidator } from '../../utils/emailValidator';
import { passwordValidator } from '../../utils/passwordValidator';
import { useTheme } from '@react-navigation/native';
import { firebase_auth } from "../../firebase/firebase_auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setIdToken, setUser } from "../../redux/slice/authSlice";

function RegisterScreen({ navigation }) {

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [errorLogin, setErrorLogin] = useState({ error: '' })

  const handleRegister = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      
      dispatch(setUser(response.user.email));
      dispatch(setIdToken(response._tokenResponse.idToken));

    } catch (error) {
      setErrorLogin({ error: error });
    }
  };

  const onRegisterPressed = () => {    
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    } else {
      handleRegister(email.value, password.value)
    }
  }


  const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      color: colors.primary,
      fontWeight: 'bold',
      paddingVertical: 12,
      marginBottom: 20
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      margin: 'auto',
      backgroundColor: colors.background,
      paddingTop: 0,
      width: '100%',
      maxWidth: 380,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    scroll: {
      width: '85%',
      marginTop: 20,
      marginBottom: 10,
    },
    input: {
      width: "85%",
      height: 50,
      borderColor: colors.text,
      color: colors.text,
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
    currentAccount: {
      fontSize: 14,
      color: colors.text,
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
       <Logo />
       <Text style={styles.header} >Registrarse</Text>
       <TextInput
          placeholder="Nombre"
          placeholderTextColor={colors.text}
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
      />
       <TextInput
        placeholder="Email"
        placeholderTextColor={colors.text}
        style={styles.input}
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={colors.text}
        secureTextEntry
        style={styles.input}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
      />
      { email.error !== '' ? <Text style={styles.wrongData}> { email.error } </Text> : null }
      { password.error !== '' ? <Text style={styles.wrongData}> { password.error } </Text> : null }
      { errorLogin.error !== '' ? <Text style={styles.wrongData}> { errorLogin.error } </Text> : null }
       <Button mode="contained" onPress={() => onRegisterPressed()} style={styles.scroll}>
         Registrarse
       </Button>
       <View style={styles.row}>         
         <Text style={styles.currentAccount}>Ya tienes cuenta? </Text>
         <TouchableOpacity onPress={() => navigation.navigate('login')}>
           <Text style={styles.link}> Iniciar Sesión</Text>
         </TouchableOpacity>
       </View>
    </View>
  )
};

export default React.memo(RegisterScreen);