import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import LoginScreen from "../features/auth/screens/LoginScreen";
import { useAuth } from "../features/auth/hooks/auth";
import RouteGuard from "./RouteGuard";
import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import { PageNotFoundScreen } from "../features/errors/screens/PageNotFoundScreen";
import UsersScreen from "../features/auth/screens/UsersScreen";
import { Routes as appRoutes } from "./routes";
import RolesScreen from "../features/accessControl/screens/RolesScreen";

export default function MainNavigator() {

  const auth = useAuth();

  return (
    <Router>
      <Routes>
        <Route path={appRoutes.login} element={<LoginScreen />} />
        <Route path={appRoutes.notFound} element={<PageNotFoundScreen />} />
        <Route path={appRoutes.home} element={<RouteGuard isRouteAccessible={auth.isLoggedIn} />}>
          <Route path={appRoutes.home} element={<DashboardScreen />} />
        </Route>
        <Route path={appRoutes.users} element={<RouteGuard isRouteAccessible={auth.isLoggedIn} />}>
          <Route path={appRoutes.users} element={<UsersScreen />} />
        </Route>
        <Route path={appRoutes.roles} element={<RouteGuard isRouteAccessible={auth.isLoggedIn} />}>
          <Route path={appRoutes.roles} element={<RolesScreen />} />
        </Route>
        <Route path="*" element={<Navigate to={appRoutes.notFound} />} />
      </Routes>
    </Router>
  );
}
  