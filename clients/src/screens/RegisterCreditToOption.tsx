import { useLocation, useNavigate } from "react-router-dom";
import netflix from "../assets/img/netflix_logo.svg";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import dataCardDebit from "../data/dataCardDebit";
import CardDebit from "../components/CardDebit";
import { ChangeEvent, FormEvent, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import {
  amExpressCardImage,
  masterCardImage,
  visaCardImage,
} from "../utils/AssetsImage";
import MaiDetectCardType from "../utils/MaiDetectCardType";
import MaiSpaceNumber from "../utils/MaiSpaceNumber";
import { useMaiSendConfirmation } from "../hooks/MaiHookRegister";
const RegisterCreditOption = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [inputCardNumberError, setInputCardNumberError] = useState(false);
  const [inputDateExpError, setInputDateExpError] = useState(false);
  const [inputCardDateExp, setInputCardDateExp] = useState<Dayjs | null>(null);
  const [dataInput, setDataInput] = useState({ firstName: "", lastName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [typeCard, setTypeCard] = useState("");
  const onHandleCheckCartDebit = (e: ChangeEvent<HTMLInputElement>) => {
    const textCurrent = e.target.value.replaceAll(" ", "");
    if (textCurrent.length <= 16) {
      if (textCurrent.length >= 4) {
        setTypeCard(MaiDetectCardType(textCurrent));
        setInputCardNumber(MaiSpaceNumber(textCurrent));
      } else {
        setInputCardNumber(textCurrent);
      }
    }
  };
  const onHandleDateExp = (e: Dayjs | null) => {
    if (e === null) {
      setInputDateExpError(true);
    } else {
      const day = new Date().getMonth();
      if (e.month() <= day) {
        setInputDateExpError(true);
      } else {
        setInputDateExpError(false);
      }
    }
  };
  const cardTypeImg = (type: string) => {
    switch (type) {
      case "visa":
        return <CardDebit border="none" src={visaCardImage} />;
      case "master":
        return <CardDebit border="none" src={masterCardImage} />;
      case "express":
        return <CardDebit border="none" src={amExpressCardImage} />;
      default:
        return null;
    }
  };
  const onHandleSubmitPayment = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMaiSendConfirmation(location.state.email)
    .then(result=>{
      if(result?.message==="success"){
          setIsLoading(false);
          navigate("/register/emailCheck", { state: location.state });
      }else{
        setIsLoading(false);
      }
    })
    .catch(err=>console.error(err))
  };
  return (
    <>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <img
              width={70}
              height={70}
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
              Se deconnecter
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          bounce: 0,
          duration: 1,
          ease: "easeInOut",
          type: "spring",
        }}
      >
        <Container>
          <Stack py={15} justifyContent={"center"} alignItems={"center"}>
            <Stack width={"50%"}>
              <Typography variant="body2" color="white">
                ÉTAPE 3 SUR 3
              </Typography>
              <Typography variant="h3" color="white">
                Configurer votre carte de crédit ou de débit
              </Typography>
              <Stack direction={"row"} my={3}>
                {dataCardDebit.map((item) => (
                  <CardDebit key={item.type} src={item.img} />
                ))}
              </Stack>
              <Box>
                <form method="post" onSubmit={onHandleSubmitPayment}>
                  <TextField
                    id="outlined-basic"
                    label="Numero de Carte"
                    variant="outlined"
                    value={inputCardNumber}
                    fullWidth={true}
                    helperText={
                      inputCardNumberError
                        ? "Veuillez entrer un numero de carte"
                        : ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {cardTypeImg(typeCard)}
                        </InputAdornment>
                      ),
                    }}
                    onBlur={() => {
                      const textNumber = inputCardNumber.replaceAll(
                        " ",
                        ""
                      ).length;
                      if (textNumber < 16) {
                        setInputCardNumberError(true);
                      } else {
                        setInputCardNumberError(false);
                      }
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onHandleCheckCartDebit(e)
                    }
                  />
                  <Stack direction={"row"} gap={2} my={2}>
                    <DatePicker
                      views={["month", "year"]}
                      openTo="month"
                      value={inputCardDateExp}
                      onChange={(e: Dayjs | null) => onHandleDateExp(e)}
                      label="Date d'expiration"
                    />
                    <TextField
                      id="cvv"
                      label="CVV"
                      variant="outlined"
                      name="cvv"
                    />
                  </Stack>
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="Prenom"
                    variant="outlined"
                    fullWidth={true}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Nom de famille"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => setInputCardNumber(e.target.value)}
                  />
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    my={2}
                    padding={"0.5rem 1rem"}
                    sx={{ backgroundColor: "rgb(36, 36, 36)", borderRadius: 2 }}
                  >
                    <Stack>
                      <Typography variant="h5" color="white">
                        9,99 USD/mois
                      </Typography>
                      <Typography variant="h6" color="grey">
                        Prime
                      </Typography>
                    </Stack>
                    <Link
                      component={motion.button}
                      whileTap={{ scale: 0.97 }}
                      variant="h6"
                      onClick={() => navigate("/login")}
                      sx={{
                        textDecoration: "none",
                        transition: "0.3s",
                        color: "rgb(0, 132, 255)",
                        "&:hover": { textDecoration: "1px solid blue" },
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Changement
                    </Link>
                  </Stack>
                  <Stack>
                    <Typography color="grey" variant="caption">
                      En cochant la case ci-dessous, vous acceptez nos
                      Conditions d'utilisation , notre Déclaration de
                      confidentialité , et que vous avez plus de 18 ans. Netflix
                      poursuivra automatiquement votre abonnement et facturera
                      les frais d'abonnement (actuellement 9,99 USD/mois) à
                      votre mode de paiement jusqu'à ce que vous annuliez. .
                      Vous pouvez annuler à tout moment pour éviter des frais
                      futurs.
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      sx={{ color: "white", mb: 3 }}
                      label="Je suis d'accord"
                    />
                  </Stack>
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Button
                      sx={{
                        backgroundColor: "red",
                        textTransform: "capitalize",
                        fontSize: "1.4rem",
                      }}
                      variant="contained"
                      color="error"
                      size="large"
                      type="submit"
                    >
                      Commencer d'adhesion
                    </Button>
                  </Box>
                  <Typography variant="caption" color="grey">
                    Cette page est protégée par Google reCAPTCHA pour garantir
                    que vous n'êtes pas un bot. Apprendre encore plus.
                  </Typography>
                </form>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </motion.div>
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress size={80} color="secondary" />
      </Backdrop>
    </>
  );
};

export default RegisterCreditOption;
