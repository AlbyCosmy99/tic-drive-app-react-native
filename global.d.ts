/// <reference types="nativewind/types" />

//solves the message 'Cannot find module '@/assets/svg/forwardArrow.svg' or its corresponding type declarations.'
declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

//the three following statements solve the problem 'Cannot find module '../../assets/images/TicDriveLogo.jpeg' or its corresponding type declarations'
declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: any;
  export default value;
}
