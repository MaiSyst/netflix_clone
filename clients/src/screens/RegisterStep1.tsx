import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import netflix from "../assets/img/netflix_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import DevicesImage from "../assets/img/Devices.png";
import { motion } from "framer-motion";
const RegisterStep1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <img
              width={100}
              height={100}
              style={{ fill: "red" }}
              src={netflix}
              alt="Logo"
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link
              component="button"
              variant="h6"
              onClick={() => navigate("/login")}
              sx={{ textDecoration: "none", marginTop: "2rem" }}
            >
              S'identifier
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        exit={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          bounce: 0,
          ease: "easeInOut",
        }}
      >
        <Container>
          <Stack
            sx={{ my: 20 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ width: 400 }}>
              <Box sx={{ mb: 5, width: "100%" }}>
                <img
                  width={"100%"}
                  height={"auto"}
                  src={DevicesImage}
                  alt="devices image"
                />
              </Box>
              <Typography
                sx={{ textAlign: "center" }}
                color="white"
                variant="body1"
              >
                ÉTAPE 1 SUR 3
              </Typography>
              <Typography
                sx={{ textAlign: "center" }}
                color="white"
                variant="h4"
              >
                Terminer la configuration de votre compte
              </Typography>
              <Typography
                sx={{ textAlign: "center", my: 2 }}
                color="white"
                variant="body1"
              >
                Netflix est personnalisé pour vous. Créez un mot de passe pour
                regarder sur n'importe quel appareil à tout moment.
              </Typography>
              <Button
                sx={{
                  width: "100%",
                  height: "5em",
                  marginTop: "5rem",
                  backgroundColor: "red",
                }}
                color="error"
                variant="contained"
                onClick={() =>
                  navigate("/register/step2", { state: location.state })
                }
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "400", textTransform: "capitalize" }}
                >
                  Suivant
                </Typography>
              </Button>
            </Box>
          </Stack>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterStep1;
