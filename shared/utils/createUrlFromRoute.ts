export const createUrlFromRoute = (route: string, params: Record<string, string>) => {
    return route.replace(/:([a-zA-Z]+)/g, (_, key) => params[key]);
}
