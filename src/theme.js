import Constants from 'expo-constants';
import { useWindowDimensions, Platform } from 'react-native';

/* Return the App Theme Object */
export default function getTheme(scheme) {
  const { width, height } = useWindowDimensions();
  const dark = scheme === 'dark';
  const normalize = (size, max) => Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === 'ios',
    margin: normalize(20, 35),
    colors: {
      white: '#ffffff',
      primary: dark ? '#52B788' : '#52B788', 
      secondaryLight: '#95D5B2',
      secondaryDark: '#075230',
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      text: dark ? '#f2f2f2' : '#1a1a1a',
      textBlack: dark ? '#1a1a1a' : '#f2f2f2',
      card: dark ? '#000000' : '#ffffff',
      background: dark ? '#1a1a1a' : '#f2f2f2',
      backgroundColor: dark ? '#1a1a1a' : '#F8FAFC',
      backgroundColorSecond: dark ? '#393939' : '#e7e7e7',
      border: dark ? '#f2f2f2dd' : '#1a1a1add',
      button: dark ? '#74C69D' : '#74C69D',
    },
    font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
