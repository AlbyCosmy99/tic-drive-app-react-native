import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgClock = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.42}
      strokeWidth={2}
      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.42}
      strokeWidth={2}
      d="M11 5v6l4 2"
    />
  </Svg>
);
export default SvgClock;
