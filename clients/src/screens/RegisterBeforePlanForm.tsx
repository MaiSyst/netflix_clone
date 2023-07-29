import {
  AppBar,
  Box,
  Link,
  Container,
  Toolbar,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import netflix from "../assets/img/netflix_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, CheckCircleOutline } from "@mui/icons-material";
import { motion } from "framer-motion";

const RegisterBeforePlanForm = () => {
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
              sx={{
                textDecoration: "none",
                transition: "0.3s",
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "red" },
              }}
            >
              S'identifier
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0,opacity:1}}
        transition={{
          bounce: 0,
          duration: 1,
          ease: "easeInOut",
          type: "spring",
        }}
      >
        <Container>
          <Stack
            sx={{ my: 20 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                width: 450,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CheckCircleOutline
                sx={{ width: 150, height: 150, mb: 2 }}
                color="error"
              />
              <Typography color="white" variant="body2" sx={{ mb: 1 }}>
                ÉTAPE 2 SUR 3
              </Typography>
              <Typography color="white" variant="h4">
                Choisissez votre forfait.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                  my: 5,
                }}
              >
                <Stack direction={"row"} mb={2} alignItems={"center"}>
                  <Check sx={{ width: 40, height: 40, mr: 1 }} color="error" />
                  <Typography color="white" variant="body1">
                    Aucun engagement, annulez à tout moment.
                  </Typography>
                </Stack>
                <Stack direction={"row"} mb={2} alignItems={"center"}>
                  <Check sx={{ width: 40, height: 40, mr: 1 }} color="error" />
                  <Typography color="white" variant="body1">
                    Tout sur Netflix pour un prix modique.
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Check sx={{ width: 40, height: 40, mr: 1 }} color="error" />
                  <Typography color="white" variant="body1">
                    Pas de publicité et pas de frais supplémentaires. Jamais.
                  </Typography>
                </Stack>
              </Box>
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
                  navigate("/register/planform", { state: location.state })
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

export default RegisterBeforePlanForm;
