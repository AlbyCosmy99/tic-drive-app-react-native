import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgFilter = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#5F6368"
      d="M8.5 18.5v-6h2v2h8v2h-8v2zm-8-2v-2h6v2zm4-4v-2h-4v-2h4v-2h2v6zm4-2v-2h10v2zm4-4v-6h2v2h4v2h-4v2zm-12-2v-2h10v2z"
    />
  </Svg>
);
export default SvgFilter;
