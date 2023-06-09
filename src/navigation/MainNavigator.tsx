import {
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import LoginScreen from "../features/auth/screens/LoginScreen";
import { useAuth } from "../features/auth/hooks/auth";
import RouteGuard from "./RouteGuard";
import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import { PageNotFoundScreen } from "../features/errors/screens/PageNotFoundScreen";
import UsersScreen from "../features/auth/screens/UsersScreen";
import { Routes as appRoutes } from "./routes";
import RolesScreen from "../features/accessControl/screens/RolesScreen";
import RolePermissionsScreen from "../features/accessControl/screens/RolePermissionsScreen";
import CitiesScreen from "../features/cities/screens/CitiesScreen";
import CurrenciesScreen from "../features/currencies/screens/CurrenciesScreen";
import PayModesScreen from "../features/payModes/screens/PayModesScreen";
import RatesScreen from "../features/rates/screens/RatesScreen";
import UserDetailsScreen from "../features/auth/screens/UserDetailsScreen";
import { useFeaturePermissions } from "../features/accessControl/hooks/permissions";
import { AccessDeniedScreen } from "../features/errors/screens/AccessDeniedScreen";
import UserProfileScreen from "../features/auth/screens/UserProfileScreen";

export default function MainNavigator() {

  const auth = useAuth();
  const permissionsChecker = useFeaturePermissions();

  return (
    <Routes>
      <Route path={appRoutes.login} element={<LoginScreen />} />
      <Route path={appRoutes.notFound} element={<PageNotFoundScreen />} />
      <Route path={appRoutes.denied} element={<AccessDeniedScreen />} />
      <Route
        path={appRoutes.home}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.home)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.home} element={<DashboardScreen />} />
      </Route>
      <Route
        path={appRoutes.users}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.users)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.users} element={<UsersScreen />} />
      </Route>
      <Route
        path={`${appRoutes.users}/:uid`}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.users)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route
          path={`${appRoutes.users}/:uid`}
          element={<UserDetailsScreen />}
        />
      </Route>
      <Route
        path={appRoutes.roles}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.roles)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.roles} element={<RolesScreen />} />
      </Route>
      <Route
        path={`${appRoutes.roles}/:uid${appRoutes.permissions}`}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.roles)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route
          path={`${appRoutes.roles}/:uid${appRoutes.permissions}`}
          element={<RolePermissionsScreen />}
        />
      </Route>
      <Route
        path={appRoutes.cities}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.cities)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.cities} element={<CitiesScreen />} />
      </Route>
      <Route
        path={appRoutes.currencies}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn &&
              permissionsChecker(appRoutes.currencies)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.currencies} element={<CurrenciesScreen />} />
      </Route>
      <Route
        path={appRoutes.payModes}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.payModes)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.payModes} element={<PayModesScreen />} />
      </Route>
      <Route
        path={appRoutes.rates}
        element={
          <RouteGuard
            isRouteAccessible={
              auth.isLoggedIn && permissionsChecker(appRoutes.rates)?.canRead
            }
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
      >
        <Route path={appRoutes.rates} element={<RatesScreen />} />
      </Route>
      <Route
        path={appRoutes.userProfile}
        element={
          <RouteGuard
            isRouteAccessible={auth.isLoggedIn}
            redirectRoute={ auth.isLoggedIn ? appRoutes.denied : appRoutes.login}
          />
        }
        handle={{ crumb: (data: any) => <span>{data?.threadName}</span>,}}
      >
        <Route path={appRoutes.userProfile} element={<UserProfileScreen />} />
      </Route>
      <Route path="*" element={<Navigate to={appRoutes.notFound} />} />
    </Routes>
  );
}
  