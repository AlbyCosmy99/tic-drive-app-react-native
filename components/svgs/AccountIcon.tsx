import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgAccountIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path d="M10.1 10q-1.925 0-3.296-1.37t-1.37-3.296 1.37-3.296T10.1.667t3.296 1.37q1.37 1.372 1.37 3.297t-1.37 3.295T10.1 10M.767 17v-.933q0-.992.51-1.823t1.356-1.269a17.3 17.3 0 0 1 3.675-1.356 16 16 0 0 1 3.792-.452q1.925 0 3.792.452 1.866.453 3.675 1.356a3.4 3.4 0 0 1 1.356 1.27q.51.83.51 1.822V17q0 .963-.685 1.648a2.25 2.25 0 0 1-1.648.686h-14a2.25 2.25 0 0 1-1.648-.686A2.25 2.25 0 0 1 .767 17" />
  </Svg>
);
export default SvgAccountIcon;
