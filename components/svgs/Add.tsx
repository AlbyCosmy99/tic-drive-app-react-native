import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgAdd = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#39B269"
      d="M5.167 6.834H1a.8.8 0 0 1-.594-.24A.8.8 0 0 1 .166 6q0-.354.24-.593.24-.24.594-.24h4.167V1q0-.354.24-.593.239-.24.593-.24t.594.24q.24.24.24.593v4.167H11q.354 0 .594.24t.24.593-.24.594a.8.8 0 0 1-.594.24H6.833V11q0 .354-.24.594a.8.8 0 0 1-.593.24.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.594z"
    />
  </Svg>
);
export default SvgAdd;
