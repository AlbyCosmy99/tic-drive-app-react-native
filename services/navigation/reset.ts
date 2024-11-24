import Navigation from "@/types/nav/Navigation";

const navigationReset = (
    navigation: Navigation, 
    index: number = 0,
    routeName: string, 
    routeParams: any = {}, 
    stateRouterName: string = "", 
    stateRouteParams: any = {}
) => {
    navigation?.reset({
        index,
        routes: [
          {
            name: routeName,
            params: routeParams,
            state: {
                routes: [{ name: stateRouterName, params: stateRouteParams }],
            },
          },
        ],
    });     
}

export default navigationReset