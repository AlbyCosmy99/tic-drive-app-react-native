import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgNotifications = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M1 17a.97.97 0 0 1-.712-.288A.97.97 0 0 1 0 16q0-.424.288-.713A.97.97 0 0 1 1 15h1V8q0-2.075 1.25-3.687Q4.5 2.7 6.5 2.2v-.7q0-.625.438-1.062A1.45 1.45 0 0 1 8 0q.624 0 1.063.438Q9.5.874 9.5 1.5v.7q2 .5 3.25 2.113T14 8v7h1q.424 0 .713.287.287.288.287.713 0 .424-.287.712A.97.97 0 0 1 15 17zm7 3q-.824 0-1.412-.587A1.93 1.93 0 0 1 6 18h4q0 .824-.588 1.413A1.93 1.93 0 0 1 8 20"
    />
  </Svg>
);
export default SvgNotifications;
