import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgFavouriteIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={21}
    fill="none"
    {...props}
  >
    <Path d="M12.5 20.713a2.5 2.5 0 0 1-.831-.146 1.9 1.9 0 0 1-.744-.467l-2.012-1.837a80 80 0 0 1-5.586-5.615Q.834 9.863.833 6.508q0-2.741 1.838-4.579Q4.508.092 7.251.092a6.7 6.7 0 0 1 2.916.656A6.95 6.95 0 0 1 12.5 2.542 6.95 6.95 0 0 1 14.834.748 6.7 6.7 0 0 1 17.75.092q2.742 0 4.58 1.837 1.836 1.838 1.837 4.58 0 3.354-2.48 6.154t-5.629 5.629L14.075 20.1q-.321.321-.744.467a2.5 2.5 0 0 1-.83.146" />
  </Svg>
);
export default SvgFavouriteIcon;
