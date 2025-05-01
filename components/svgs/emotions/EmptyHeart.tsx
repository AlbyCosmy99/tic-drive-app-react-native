import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgEmptyHeart = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.146 1C3.304 1 1 3.46 1 6.492c0 6.07 9.75 13.008 9.75 13.008s9.75-6.937 9.75-13.008C20.5 2.735 18.196 1 15.354 1c-2.015 0-3.759 1.236-4.604 3.036C9.905 2.236 8.16 1 6.146 1"
    />
  </Svg>
);
export default SvgEmptyHeart;
