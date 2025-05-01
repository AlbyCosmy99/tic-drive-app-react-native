import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMap = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#5F6368"
      d="m12 18.5-6-2.1-4.65 1.8a.9.9 0 0 1-.925-.113A.99.99 0 0 1 0 17.25v-14q0-.325.188-.575A1.13 1.13 0 0 1 .7 2.3L6 .5l6 2.1L16.65.8a.9.9 0 0 1 .925.112.99.99 0 0 1 .425.838v14a.93.93 0 0 1-.187.575 1.13 1.13 0 0 1-.513.375zm-1-2.45V4.35l-4-1.4v11.7zm2 0 3-1V3.2l-3 1.15zM2 15.8l3-1.15V2.95l-3 1z"
    />
  </Svg>
);
export default SvgMap;
