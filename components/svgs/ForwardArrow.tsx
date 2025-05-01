import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgForwardArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#5f6368"
    {...props}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" />
  </Svg>
);
export default SvgForwardArrow;
