import { FC } from "react";
import { SvgProps } from "react-native-svg";

interface Service {
  id: number;
  title: string;
  description?: string;
  icon: string | FC<SvgProps>;
}

export default Service