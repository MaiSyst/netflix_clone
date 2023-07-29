import { Header, ImageBackground, MaiNav } from "../styles/Home.style";
import hugeBackground from "../assets/img/huge_image_perspective.jpg";
import {
    Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Snackbar,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import netflix from "../assets/img/netflix_logo.svg";
import { API } from "../utils/Core";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dataInput, setDataInput] = useState({ email: "", password: "" });
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState({
    message: "",
    isError: false,
  });
  const [errorServer, setErrorServer] = useState({
    message: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState({
    message: "",
    isError: false,
  });
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  const onHandleInputChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setDataInput({ ...dataInput, [element.id]: element.value });
  };
  const onHandleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (checkFieldValidate()) {
      setIsLoading(true);
        API.post("/auth/signIn", dataInput, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(({data}) =>{
            if (data.isError) {
                switch (data.message) {
                  case "Password is wrong":
                    setErrorServer({
                      message: "Mot de passe incorrect",
                      isError: true,
                    });
                    setOpenSnackBar(true);
                    break;
                  case "User don't exist":
                    setErrorServer({
                      message: "Utilisateur n'exist pas.",
                      isError: true,
                    });
                    setOpenSnackBar(true);
                    break;
                  case "password or email error":
                    setErrorServer({
                      message: "Veuillez les informations saisies.",
                      isError: true,
                    });
                    setOpenSnackBar(true);
                    break;
                    default:
                        setErrorServer({
                          message: "Erreur du server, ressayer plustard.",
                          isError: true,
                        });
                        setOpenSnackBar(true);
                        break;
                }
                setIsLoading(false);
            }else{
                setErrorServer({
                  message: "Connection avec success...",
                  isError: false,
                });
                sessionStorage.setItem("maiToken",data.token)
                sessionStorage.setItem("maiUserId", data.id);
                sessionStorage.setItem("profile", data.profile);
                sessionStorage.setItem("username", data.username);
                if(data.isAdmin){
                    setTimeout(() => {
                        setIsLoading(false);
                      navigate("/admin", { state: data });
                    }, 1000);
                }else{
                    setTimeout(() => {
                        setIsLoading(false);
                      navigate("/users", { state: data });
                    }, 1000);
                }

                setOpenSnackBar(true);
            }
          })
          .catch((err) => console.log(err));
    }
 };
  const checkFieldValidate = (): boolean => {
    if (
      dataInput.email.trim() === "" ||
      dataInput.email === null ||
      dataInput.password.trim() === "" ||
      dataInput.password === null
    ) {
      if (dataInput.email.trim() === "" || dataInput.email === null) {
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
    <ThemeProvider theme={theme}>
      <Header>
        <ImageBackground image={hugeBackground} />
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpenSnackBar(false)}
        >
          <Alert
            onClose={() => setOpenSnackBar(false)}
            severity={errorServer.isError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {errorServer.message}
          </Alert>
        </Snackbar>
        <MaiNav>
          <div className="left">
            <img
              width={150}
              height={150}
              style={{ fill: "red" }}
              src={netflix}
              alt="Logo"
            />
          </div>
          <div className="right"></div>
        </MaiNav>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80%",
          }}
        >
          <Card
            variant="outlined"
            sx={{ width: "450px", borderRadius: "20px" }}
          >
            <CardContent sx={{ marginInline: "2rem" }}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "2rem",
                  marginTop: "2rem",
                  fontWeight: "bold",
                }}
              >
                S'identifier
              </Typography>
              <form method="post" onSubmit={(e) => onHandleLoginSubmit(e)}>
                <FormControl
                  variant="filled"
                  color={errorEmail.isError ? "warning" : "primary"}
                  sx={{
                    width: "100%",
                    marginBottom: "2rem",
                  }}
                  error={errorEmail.isError}
                >
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <FilledInput
                    id="email"
                    type={"email"}
                    value={dataInput.email}
                    onChange={(e) => onHandleInputChange(e)}
                  />
                  {errorEmail.isError && (
                    <FormHelperText id="component-helper-email">
                      {errorEmail.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  color="primary"
                  variant="filled"
                  sx={{ width: "100%" }}
                  error={errorPassword.isError}
                >
                  <InputLabel htmlFor="password">Mot de passe</InputLabel>
                  <FilledInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={dataInput.password}
                    onChange={(e) => onHandleInputChange(e)}
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
                  />
                  {errorPassword.isError && (
                    <FormHelperText id="component-helper-text">
                      {errorPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  sx={{
                    width: "100%",
                    marginTop: "5rem",
                    position: "relative",
                    backgroundColor: "red",
                  }}
                  color="error"
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="secondary" size={25} />
                  ) : (
                    "S'identifier"
                  )}
                </Button>
              </form>
              <div
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Souviens-toi de moi"
                />
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                  sx={{ textDecoration: "none" }}
                >
                  Besoin d'aide?
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "4rem",
                  alignItems: "center",
                }}
              >
                Nouveau sur Netflix ?
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate("/")}
                  sx={{ textDecoration: "none", marginLeft: "5px" }}
                >
                  Inscrivez-Vous maintenant .
                </Link>
              </div>
              <Typography variant="body2" sx={{ marginTop: "2rem" }}>
                Cette page est protégée par Google reCAPTCHA pour garantir que
                vous n'être pas un bot.
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
                sx={{ textDecoration: "none", marginBottom: "2rem" }}
              >
                Apprendre encore plus .
              </Link>
            </CardContent>
          </Card>
        </div>
      </Header>
    </ThemeProvider>
  );
};

export default Login;
