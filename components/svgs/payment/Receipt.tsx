import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgReceipt = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="url(#receipt_svg__a)" d="M0 0h24v24H0z" />
    <Defs>
      <Pattern
        id="receipt_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#receipt_svg__b" transform="scale(.01)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAZKADAAQAAAABAAAAZAAAAAAvu95BAAACOUlEQVR4Ae2aQW7DMAwE06I/9jv85uaQD3BFLrFwpmeKWc+AEqz69eIPAhCAAAQgcEbgR112Xde/uuab6+/7lhj/fjOsxGdHSJgVhIQJ+evmUffI7u+lr++esUxImGGEICSMQFgcJgQhYQTC4jAhCAkjEBaHCUFIGIGwOEwIQsIIhMVhQhASRiAsTvu2t/o83VvQ6u+46rZutdmyXAYP+yLkEJxrGUJcZA/7rp0hW3vwIYeYZUxIjIpPEIQgJIxAWBwmBCFhBMLiMCEICSMQFocJQUgYgbA4TAhCwgiExWFCEBJGICwOE4KQMAJhcZgQhIQRCIvDhCAkjEBYHCYEIWEEwuIwIQgJIxAWZ+27rO1ve6vfgVVzVft1/bJldQkOr0fIMNBuO4R0CQ6vXztDtvZglU9aLiZENWiuR4gZsNoeISoxcz1CzIDV9ghRiZnrEWIGrLZHiErMXL/2HlK9M5p63ur7RTVXtV83PxPSJTi8HiHDQLvtENIlOLx+7QzZ2oNVPmm5mBDVoLkeIWbAanuEqMTM9QgxA1bbI0QlZq5HiBmw2h4hKjFz/dp7SPXOaOp5q+8X1VzVft38TEiX4PB6hAwD7bZDSJfg8Pq1M2RrD1b5pOViQlSD5nqEmAGr7RGiEjPXI8QMWG2PEJWYuR4hZsBqe4SoxMz1CDEDVtsjRCVmrkeIGbDaHiEqMXM9QsyA1fYIUYmZ69u3vdX/uJmf4zHtmZAwlQhBSBgB4kAAAhCAAAQeQuANs00yvE+3FpsAAAAASUVORK5CYII="
        id="receipt_svg__b"
        width={100}
        height={100}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgReceipt;
