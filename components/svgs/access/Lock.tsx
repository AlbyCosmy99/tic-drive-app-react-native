import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLock = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M2 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 0 19V9q0-.825.588-1.412A1.93 1.93 0 0 1 2 7h1V5q0-2.075 1.463-3.537Q5.925 0 8 0t3.537 1.463T13 5v2h1q.825 0 1.412.588Q16 8.175 16 9v10q0 .824-.588 1.413A1.93 1.93 0 0 1 14 21zm6-5q.825 0 1.412-.588Q10 14.826 10 14t-.588-1.412A1.93 1.93 0 0 0 8 12q-.824 0-1.412.588A1.93 1.93 0 0 0 6 14q0 .825.588 1.412Q7.175 16 8 16M5 7h6V5q0-1.25-.875-2.125A2.9 2.9 0 0 0 8 2q-1.25 0-2.125.875A2.9 2.9 0 0 0 5 5z"
    />
  </Svg>
);
export default SvgLock;
