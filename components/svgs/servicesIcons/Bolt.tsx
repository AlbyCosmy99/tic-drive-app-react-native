import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBolt = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="m7.923 23.756 8.5-10.2h-5.778l1.122-8.878-7.678 11.1h4.967zM6.5 18H1.945q-.664 0-.982-.594-.318-.595.082-1.15L11.878.633a1.47 1.47 0 0 1 .733-.55q.445-.15.9.028.456.178.7.593.245.414.178.885l-1.222 9.744H18.8q.72 0 1.01.634.29.633-.165 1.189l-11.9 14.266q-.31.364-.76.477-.451.112-.862-.082a1.48 1.48 0 0 1-.65-.598 1.3 1.3 0 0 1-.173-.875z"
    />
  </Svg>
);
export default SvgBolt;
