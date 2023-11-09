



## Aplicación de Lista de Libros en React Native

Esta es una aplicación de libros que cuenta con las opciones de ver los libros disponibles (nube Firebase), los cuales pueden agreagarse a favoritos o al carrito. La aplicación cuenta con diferentes pantallas como pantalla de inicio, detalle del libro, check out, configuración del usuario, etc.
<p>FIGMA DEL PROYECTO: <a href="https://www.figma.com/file/pbK7iXHt8HWJ5f3x8YMtND/Erabook---Ebook-Store-%26-Ebook-Reader-App-UI-Kit-(Community)-(Community)?type=design&node-id=0-1&mode=design&t=YTmtnbMweXpuNfU1-0" alt="figma proyecto"> here </a> </p>

## Aplicación de Lista de Libros en React Native

Para iniciar la aplicación es necesario seguir los siguientes pasos:
1. Clonar la carpeta del repo en base local.
2. Entrar en la carpeta del projecto /react-native-book-app
3. Installar dependencias con el comando "npm install" o "yarn install"
4. Iniciar el projecto. El mismo puede iniciar con el comando "npm start" o "yarm start". Posteriormente escanear el codigo QR con el celular para cargar la applicación en tu dispositivo mobile. Para cargar la aplicación directamente en Visual Studio Code (Dispositivo Virtual) iniciar el proyecto con el comando "expo start --android"

### Objetivos
- [x] Buscar y guardar libros en la lista (Firabase)
- [x] Registro o Logeo en la aplicación (Firabase)
- [x] Navegación inferior
- [x] Soporte para Reanimated 2
- [x] Animaciones integradas de Lottie
- [x] Tematización global con modos claro y oscuro
- [x] AsyncStorage para listas
- [x] Compatibilidad con iOS y Android

### Dependencias
La aplicación desarrollada con EXPO y React Native cuenta con varias dependencias siendo las principales las listadas a continuación y la todalidad de las mismas puede encontrarse en el package.json:

```
    "@react-native-async-storage/async-storage": "1.18.2",
    "@react-navigation/bottom-tabs": "^6.5.9",
    "@react-navigation/native": "^6.1.7",
    "@reduxjs/toolkit": "^1.9.6",
    "@rneui/themed": "^4.0.0-rc.8",
    "axios": "^0.26.1",
    "expo": "^49.0.8",
    "expo-image-picker": "~14.3.2",
    "firebase": "^10.4.0",
    "lottie-ios": "^3.2.3",
    "lottie-react-native": "^5.1.4",
    "react": "18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "0.72.6",
    "react-native-reanimated": "~3.3.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-shared-element": "^0.8.4",
    "react-navigation": "^4.4.4",
    "react-redux": "^8.1.3",
```

### Repo Base
La aplicación fue desarrolla a partir de la base del repo a continuación:

ORIGINAL: https://github.com/himanchau/react-native-book-app
