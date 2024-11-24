import Navigation from '@/types/nav/Navigation';

const navigationReplace = (
  navigation: Navigation,
  routeName: string,
  routeParams: any = {},
) => {
  //@ts-ignore
  navigation.replace(routeName, routeParams);
};

export default navigationReplace;
