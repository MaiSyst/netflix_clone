import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RegisterStep1 from "../screens/RegisterStep1";
import RegisterStep2 from "../screens/RegisterStep2";
import RegisterPlanForm from "../screens/RegisterPlanForm";
import Users from "../screens/users";
import HomeAdmin from "../screens/admin";
import Movies from "../screens/users/Movies";
import Series from "../screens/users/Series";
import Favorites from "../screens/users/Favorites";
import HomeUser from "../screens/users/HomeUser";
import DetailsSeries from "../screens/users/DetailSeries";
import RegisterBeforePlanForm from "../screens/RegisterBeforePlanForm";
import RegisterPayment from "../screens/RegisterPayment";
import RegisterCreditOption from "../screens/RegisterCreditToOption";
import RegisterEmailCheck from "../screens/RegisterEmailCheck";
import NotFoundPage from "../screens/status/NotFoundPage";

export const NavigateGraph = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    children: [
      {
        path: "/register",
        element: <RegisterStep1 />,
      },
      {
        path: "/register/step2",
        element: <RegisterStep2 />,
      },
      {
        path: "/register/beforePlaftform",
        element: <RegisterBeforePlanForm />,
      },
      {
        path: "/register/planform",
        element: <RegisterPlanForm />,
      },
      {
        path: "/register/paymentPicker",
        element: <RegisterPayment />,
      },
      {
        path:"/register/emailCheck",
        element:<RegisterEmailCheck/>
      },
      {
        path: "/register/creditOptions",
        element: <RegisterCreditOption />,
      },
    ],
  },
  {
    path: "/users",
    element: <Users />,
    children: [
      {
        path: "/users",
        element: <HomeUser />,
      },
      {
        path: "/users/movies",
        element: <Movies />,
      },
      {
        path: "/users/series",
        element: <Series />,
      },
      {
        path: "/users/favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
  },
  {
    path: "/series/details/:id",
    element: <DetailsSeries />,
  },
  {
    path:"*",
    element:<NotFoundPage/>
  }
]);
