import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgCreditCard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M2.333 14.166q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.176v-10q0-.688.49-1.177t1.177-.49h13.334q.687 0 1.177.49.49.489.49 1.177v10q0 .687-.49 1.177t-1.177.49zm0-6.666h13.334V4.166H2.333z"
    />
  </Svg>
);

export default SvgCreditCard;
