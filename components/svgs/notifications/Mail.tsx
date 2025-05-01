import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgMail = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18V8.66l7.27 5.91a1 1 0 0 0 1.46 0L20 8.66V18H4Z"
    />
  </Svg>
);

export default SvgMail;
