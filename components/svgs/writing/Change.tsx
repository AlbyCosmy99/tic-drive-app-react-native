import * as React from 'react';
import Svg, {Mask, Path, G} from 'react-native-svg';
const SvgChange = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Mask
      id="change_svg__a"
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <Path fill="#D9D9D9" d="M0 0h20v20H0z" />
    </Mask>
    <G mask="url(#change_svg__a)">
      <Path
        fill="#39B269"
        d="M3.333 20q-.687 0-1.177-.49a1.6 1.6 0 0 1-.49-1.177q0-.687.49-1.177t1.177-.49h13.334q.687 0 1.177.49t.49 1.177-.49 1.177-1.178.49zm0-5.833v-2.354a.86.86 0 0 1 .25-.605l9.084-9.062q.229-.23.53-.354.303-.126.636-.125.334 0 .646.125.312.124.563.375l1.145 1.166q.25.23.365.542t.114.646q0 .312-.114.614a1.6 1.6 0 0 1-.365.552L7.125 14.75a.83.83 0 0 1-.604.25H4.167a.8.8 0 0 1-.594-.24.8.8 0 0 1-.24-.593m10.5-8.5L15 4.5l-1.167-1.167L12.666 4.5z"
      />
    </G>
  </Svg>
);
export default SvgChange;
