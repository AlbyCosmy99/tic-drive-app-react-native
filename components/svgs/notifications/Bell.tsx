import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBell = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#686D5D"
      d="M0 10.875v-1.25h1.25V5.25q0-1.297.781-2.305a3.6 3.6 0 0 1 2.031-1.32v-.437q0-.39.274-.665A.9.9 0 0 1 5 .25q.39 0 .664.273a.9.9 0 0 1 .274.665v.437q1.25.312 2.03 1.32.783 1.008.782 2.305v4.375H10v1.25zm5 1.875q-.516 0-.883-.367a1.2 1.2 0 0 1-.367-.883h2.5q0 .516-.367.883-.368.367-.883.367M2.5 9.625h5V5.25q0-1.03-.734-1.766A2.4 2.4 0 0 0 5 2.75q-1.03 0-1.766.734A2.4 2.4 0 0 0 2.5 5.25z"
    />
  </Svg>
);
export default SvgBell;
