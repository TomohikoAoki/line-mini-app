export default async function ({ store, route, redirect }) {
    const token = await store.getters["getToken"];
    if (!token && route.path !== "/") {
        return redirect("/");
    }
    if (route.path === "/" && token) {
        return redirect("/top");
    }
}