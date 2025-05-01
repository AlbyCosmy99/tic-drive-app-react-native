import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgEventAvailable = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="m7.95 13.45 3.475-3.475q.3-.3.725-.3t.725.3.3.725-.3.725L8.65 15.65q-.3.3-.7.3a.96.96 0 0 1-.7-.3l-2.125-2.125q-.3-.3-.3-.725t.3-.725.725-.3.725.3zM2 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 0 18V4q0-.824.588-1.412A1.93 1.93 0 0 1 2 2h1V1q0-.424.288-.712A.97.97 0 0 1 4 0q.424 0 .713.288Q5 .575 5 1v1h8V1q0-.424.287-.712A.97.97 0 0 1 14 0q.424 0 .713.288Q15 .575 15 1v1h1q.824 0 1.413.587Q18 3.176 18 4v14q0 .824-.587 1.413A1.93 1.93 0 0 1 16 20zm0-2h14V8H2z"
    />
  </Svg>
);
export default SvgEventAvailable;
