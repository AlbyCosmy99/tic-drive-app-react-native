import Navigation from "@/types/nav/Navigation";

const navigationPush = (
    navigation: Navigation, 
    routeName: string, 
    routeParams: any = {}, 
    stateRouterName: string = "", 
    stateRouteParams: any = {}
) => {
    // @ts-ignore
    navigation?.navigate({
        name: routeName, 
        params: routeParams,
        state: {
            routes: [{name: stateRouterName, params: stateRouteParams}]
        }
    })
}

export default navigationPush