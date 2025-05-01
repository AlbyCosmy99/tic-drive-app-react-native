import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCash = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#192921"
      d="M.875.25h26.25v17.5H.875zM14 4.625a4.375 4.375 0 1 1 0 8.75 4.375 4.375 0 0 1 0-8.75M6.708 3.167a2.917 2.917 0 0 1-2.916 2.916v5.834a2.917 2.917 0 0 1 2.916 2.916h14.584a2.917 2.917 0 0 1 2.916-2.916V6.083a2.917 2.917 0 0 1-2.916-2.916z"
    />
  </Svg>
);
export default SvgCash;
