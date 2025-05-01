import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgPlus = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#DF1525"
      fillRule="evenodd"
      d="M12.79 6a1 1 0 0 0-1 1v4H7.527a1 1 0 1 0 0 2h4.263v4a1 1 0 0 0 1 1h.105a1 1 0 0 0 1-1v-4h4.263a1 1 0 1 0 0-2h-4.263V7a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgPlus;
