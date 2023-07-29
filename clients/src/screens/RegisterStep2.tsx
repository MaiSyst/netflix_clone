import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import netflix from "../assets/img/netflix_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import isValidateEmail from "../utils/MaiIsValidateEmail";
import { motion } from "framer-motion";
const RegisterStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorPassword, setErrorPassword] = useState({
    message: "",
    isError: false,
  });
  const [errorEmail, setErrorEmail] = useState({
    message: "",
    isError: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [dataInput, setDataInput] = useState({ email: "", password: "" });
  const onHandleInputChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setDataInput({ ...dataInput, [element.id]: element.value });
  };

  useEffect(() => {
    setDataInput({ ...dataInput, email: location.state });
  }, [location, dataInput]);
  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (checkFieldValidate()) {
      navigate("/register/beforePlaftform", { state: dataInput });
    }
  };
  const checkFieldValidate = (): boolean => {
    if (
      dataInput.email.trim() === "" ||
      dataInput.email === null ||
      dataInput.password.trim() === "" ||
      dataInput.password === null
    ) {
      if (
        dataInput.email.trim() === "" ||
        dataInput.email === null ||
        !isValidateEmail(dataInput.email.trim())
      ) {
        setErrorEmail({
          message: "Veuillez saisir un e-mail valide.",
          isError: true,
        });
        return false;
      } else {
        setErrorEmail({
          message: "",
          isError: false,
        });
      }
      if (dataInput.password.trim() === "" || dataInput.password === null) {
        setErrorPassword({
          message: "Verifier que le champ mot de passe n'est pas vide.",
          isError: true,
        });
      } else {
        setErrorPassword({
          message: "",
          isError: false,
        });
      }
      return false;
    } else {
      if (
        dataInput.password.trim().length > 4 &&
        dataInput.password.trim().length < 60
      ) {
        setErrorPassword({
          message: "",
          isError: false,
        });
        return true;
      } else {
        setErrorPassword({
          message: "Votre mot de passe doit contenir entre 4 et 60 caractères.",
          isError: true,
        });
        return false;
      }
    }
  };
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
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{
          bounce: 0,
          duration: 1,
          type: "spring",
          ease: "easeInOut",
        }}
      >
        <Container>
          <Stack
            sx={{ my: 20 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ width: 450 }}>
              <Typography color="white" variant="body2">
                ÉTAPE 1 SUR 3
              </Typography>
              <Typography color="white" variant="h4">
                Créez un mot de passe pour commencer votre adhésion
              </Typography>
              <Typography color="white" sx={{ my: 2 }} variant="body1">
                Encore quelques étapes et le tour est joué ! Nous détestons
                aussi la paperasse.
              </Typography>
              <form method="post" onSubmit={(e) => onHandleSubmit(e)}>
                <FormControl
                  color="primary"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: "2rem" }}
                  error={errorEmail.isError}
                >
                  <InputLabel htmlFor="email">Adresse E-mail</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="text"
                    value={dataInput.email}
                    onChange={(e) => onHandleInputChange(e)}
                    label="Adresse E-mail"
                    startAdornment={
                      <InputAdornment position="start">
                        {<Email />}
                      </InputAdornment>
                    }
                  />
                  {errorEmail.isError && (
                    <FormHelperText id="component-helper-text-email">
                      {errorEmail.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  color="primary"
                  variant="outlined"
                  sx={{ width: "100%", marginTop: "2rem" }}
                  error={errorPassword.isError}
                >
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={dataInput.password}
                    onChange={(e) => onHandleInputChange(e)}
                    label="Mot de passe"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                  />
                  {errorPassword.isError && (
                    <FormHelperText id="component-helper-text">
                      {errorPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControlLabel
                  sx={{ color: "white", my: 3 }}
                  control={<Checkbox defaultChecked />}
                  label="Veuillez ne pas m'envoyer d'offres spéciales Netflix par e-mail."
                />
                <Button
                  sx={{
                    width: "100%",
                    height: "5em",
                    marginTop: "5rem",
                    position: "relative",
                    backgroundColor: "red",
                  }}
                  color="error"
                  variant="contained"
                  type="submit"
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "400", textTransform: "capitalize" }}
                  >
                    Suivant
                  </Typography>
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterStep2;
