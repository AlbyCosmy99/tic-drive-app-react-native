import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLogout = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    stroke="gray"
    viewBox="-20.4 -20.4 64.8 64.8"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.176}
      d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M8 8l-4 4m0 0 4 4m-4-4h12"
    />
  </Svg>
);
export default SvgLogout;
