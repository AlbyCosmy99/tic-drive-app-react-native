import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCheck = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      fill="#0F7439"
      d="M4.367 5.964 9.945.386a.73.73 0 0 1 .534-.228q.307 0 .535.228a.74.74 0 0 1 .228.54.74.74 0 0 1-.228.542L4.9 7.593a.73.73 0 0 1-.534.228.73.73 0 0 1-.535-.228L.973 4.734a.72.72 0 0 1-.221-.54.76.76 0 0 1 .234-.541.74.74 0 0 1 .54-.228.74.74 0 0 1 .542.228z"
    />
  </Svg>
);
export default SvgCheck;
