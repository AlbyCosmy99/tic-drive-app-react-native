/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    extremelyLightGrey: '#f7f7f7',
    lightGrey: '#ECECEC',
    green: {
      drive: '#39B269',
    },
    bookingsOptionsText: '#7c7c7c',
    ticText: '#737373',
    placeholderText: '#808080',
    backgroundLinearGradient: {
      start: '#FFFFFF',
      end: '#FBFBFB',
    },
    OAuth2BorderButton: '#ECECEC',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    backgroundLinearGradient: {
      start: '#151718',
      end: '#151718',
    },
  },
  white: '#000',
  black: '#fff',
};
