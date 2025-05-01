import TaxiAlert from '@/components/svgs/servicesIcons/TaxiAlert';
import TireRepair from '@/components/svgs/servicesIcons/TireRepair';
import OilChange from '@/components/svgs/servicesIcons/OilChange';
import Bolt from '@/components/svgs/servicesIcons/Bolt';
import AcUnit from '@/components/svgs/servicesIcons/AcUnit';
import CarRepair from '@/components/svgs/servicesIcons/CarRepair';

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
