import TaxiAlert from '@/assets/svg/servicesIcons/taxi_alert.svg';
import TireRepair from '@/assets/svg/servicesIcons/tire_repair.svg';
import OilChange from '@/assets/svg/servicesIcons/oil_change.svg';
import Bolt from '@/assets/svg/servicesIcons/bolt.svg';
import AcUnit from '@/assets/svg/servicesIcons/ac_unit.svg';
import CarRepair from '@/assets/svg/servicesIcons/car_repair.svg';

const iconMap: {[key: number]: React.FC<{width: number; height: number}>} = {
  0: CarRepair, //default icon
  1: OilChange,
  2: TaxiAlert,
  3: CarRepair,
  4: TireRepair,
  5: AcUnit,
  6: Bolt,
};

export default iconMap;
