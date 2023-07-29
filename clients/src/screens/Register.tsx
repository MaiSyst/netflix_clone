import { ThemeProvider, createTheme } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const Register = () => {
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence key={location.pathname}>
        {location.state !== null && location.state !== undefined ? (
          <Outlet />
        ) : (
          <Navigate to={"/"} replace={true} />
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Register;
