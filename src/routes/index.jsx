import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import RequireAuth from "./RequireAuth";

const renderRoute = (route) => {
  const { requireAuth, isLazy, props } = route;
  const renderRoutes = (routes) => {
    return routes ? routes.map(renderRoute) : null;
  };
  const Component = route.Component;
  const routeElement = requireAuth ? (
    <RequireAuth>
      <Component {...props} />
    </RequireAuth>
  ) : (
    <Component {...props} />
  );
  const routeComponent = isLazy ? (
    <Suspense fallback={<p>Loading ...</p>}>{routeElement}</Suspense>
  ) : (
    routeElement
  );
  return (
    <Route
      path={route.index ? undefined : route.path}
      index={route.index}
      key={route.name}
      element={routeComponent}
    >
      {route.routes && renderRoutes(route.routes)}
    </Route>
  );
};

const Page = () => {
  return <Routes>{AppRoutes.map(renderRoute)}</Routes>;
};

export default Page;