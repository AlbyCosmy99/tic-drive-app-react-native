import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgOrder = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#5F6368"
      d="M4 11.5V4.325L1.425 6.9 0 5.5l5-5 5 5-1.425 1.4L6 4.325V11.5zm7 9-5-5 1.425-1.4L10 16.675V9.5h2v7.175l2.575-2.575L16 15.5z"
    />
  </Svg>
);
export default SvgOrder;
