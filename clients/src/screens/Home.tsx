import phoneImage from "../assets/img/mobile-0819.jpg";
import imageTv from "../assets/img/tv.png";
import hugeBackground from "../assets/img/huge_image_perspective.jpg";
import boxshot from "../assets/img/boxshot.png";
import downloadAnimation from "../assets/img/download-icon.gif";
import imageKids from "../assets/img/kids.png";
import CardExpandable from "../components/CardExpandable";
import MaiFlixAsk from "../utils/MaiFlixAsk";
import netflix from "../assets/img/netflix_logo.svg";

import {
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  CardMini,
  CardMiniLeft,
  CardMiniRight,
  Header,
  ImageBackground,
  ImageTv,
  LeftContent,
  MaiFooterCol,
  MaiNav,
  MaiStarted,
  MaiUL,
  RightContent,
  Section,
  Title1,
  Title2,
} from "../styles/Home.style";
import { ArrowForwardIos, Language } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import isValidateEmail from "../utils/MaiIsValidateEmail";
const Home = () => {
  const [expanded, setExpanded] = useState("");
  const [language, setLanguage] = useState("fr");
  const navigate=useNavigate();
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  const [emailInput, setEmailInput] = useState({value:"",isError:false});
  const [isLoading, setIsLoading] = useState(false);
  const handleExpanded = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : "");
  };
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  const onHandleRegister=()=>{
    if (emailInput.value.trim() !== "" && isValidateEmail(emailInput.value.trim())) {
      setEmailInput({value:"", isError: false });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/register",{state:emailInput.value});
      }, 2000);
    } else {
      setEmailInput((prev) => ({ ...prev, isError: true }));
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflowX: "hidden" }}>
        <Header>
          <ImageBackground image={hugeBackground} />
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
            <div className="right">
              <Button
                variant="contained"
                color="error"
                sx={{ backgroundColor: "red" }}
                onClick={() => navigate("/login")}
                size="medium"
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  S'identifier
                </Typography>
              </Button>
            </div>
          </MaiNav>
          <MaiStarted>
            <h1>Films, émissions de télévision et plus encore illimités</h1>
            <h2>Regardez n'importe où. Annulez à tout moment.</h2>
            <h3 style={{ color: "white" }}>
              Prêt à regarder ? Entrez votre e-mail pour créer ou redémarrer
              votre abonnement.
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Adresse e-mail"
                variant="outlined"
                color="primary"
                sx={{ marginRight: "1rem", width: "30rem" }}
                type="email"
                value={emailInput.value}
                error={emailInput.isError}
                onChange={(e) =>
                  setEmailInput({ ...emailInput, value: e.target.value })
                }
                helperText={
                  emailInput.isError ? "Veuillez saisir un e-mail valide." : ""
                }
              />

              <Button
                variant="contained"
                color="error"
                endIcon={isLoading ? null : <ArrowForwardIos />}
                onClick={onHandleRegister}
                disabled={isLoading}
                sx={{ height: "4em", backgroundColor: "red" }}
              >
                <Typography
                  variant="h5"
                  style={{
                    color: isLoading ? "transparent" : "white",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Commencer
                </Typography>
                {isLoading && (
                  <CircularProgress
                    sx={{ position: "absolute" }}
                    color="secondary"
                    size={25}
                  />
                )}
              </Button>
            </div>
          </MaiStarted>
        </Header>
        <Section isColumn={false}>
          <LeftContent>
            <Title1>Profitez sur votre téléviseur</Title1>
            <Title2>
              Regardez sur les téléviseurs intelligents, Playstation, Xbox,
              Chromecast, Apple TV, lecteurs Blu-ray, etc.
            </Title2>
          </LeftContent>
          <RightContent>
            <ImageTv src={imageTv} alt="tv" />
            <video
              autoPlay
              width={"500px"}
              height={"500px"}
              preload="auto"
              loop
              muted
              src={
                "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
              }
            ></video>
          </RightContent>
        </Section>
        <Section isColumn={false}>
          <LeftContent>
            <img src={phoneImage} alt="phone" />
            <div style={{ position: "relative", width: "85%" }}>
              <CardMini>
                <CardMiniLeft>
                  <img src={boxshot} alt="boxshot" />
                  <div className="mai-download-info">
                    <span className="title">Stranger Things</span>
                    <span className="subtitle">Downloading...</span>
                  </div>
                </CardMiniLeft>
                <CardMiniRight>
                  <img src={downloadAnimation} alt="downloadIcon" />
                </CardMiniRight>
              </CardMini>
            </div>
          </LeftContent>
          <RightContent>
            <Title1>
              Téléchargez vos émissions pour les regarder hors ligne
            </Title1>
            <Title2>
              Enregistrez facilement vos favoris et ayez toujours quelque chose
              à regarder.
            </Title2>
          </RightContent>
        </Section>
        <Section isColumn={false}>
          <RightContent>
            <Title1>Regardez partout</Title1>
            <Title2>
              Diffusez un nombre illimité de films et d'émissions de télévision
              sur votre téléphone, votre tablette, votre ordinateur portable et
              votre téléviseur.
            </Title2>
          </RightContent>
        </Section>
        <Section isColumn={false}>
          <LeftContent>
            <img src={imageKids} alt="imageKids" />
          </LeftContent>
          <RightContent>
            <Title1>Créer des profils pour les enfants</Title1>
            <Title2>
              Envoyez les enfants vivre des aventures avec leurs personnages
              préférés dans un espace conçu spécialement pour eux, gratuitement
              avec votre abonnement.
            </Title2>
          </RightContent>
        </Section>
        <Section isColumn={true}>
          <h1 style={{ color: "white", fontSize: "3em" }}>
            Questions fréquemment posées
          </h1>
          {MaiFlixAsk.map((item) => (
            <CardExpandable
              key={item.id}
              title={item.title}
              isExpanded={expanded === item.id}
              onHandleExpanded={(isExpand) => handleExpanded(item.id, isExpand)}
              description={item.desc}
            />
          ))}
          <h3 style={{ color: "white" }}>
            Prêt à regarder ? Entrez votre e-mail pour créer ou redémarrer votre
            abonnement.
          </h3>
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Adresse e-mail"
              variant="outlined"
              color="secondary"
              value={emailInput.value}
              error={emailInput.isError}
              onChange={(e) =>
                setEmailInput({ ...emailInput, value: e.target.value })
              }
              sx={{ marginRight: "1rem", width: "30rem" }}
            />

            <Button
              variant="contained"
              color="error"
              endIcon={isLoading ? null : <ArrowForwardIos />}
              onClick={onHandleRegister}
              disabled={isLoading}
              sx={{ height: "4em", backgroundColor: "red" }}
            >
              <Typography
                variant="h5"
                style={{
                  color: isLoading ? "transparent" : "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                Commencer
              </Typography>
              {isLoading && (
                <CircularProgress
                  sx={{ position: "absolute" }}
                  color="secondary"
                  size={25}
                />
              )}
            </Button>
          </div>
        </Section>
        <Section style={{ justifyContent: "space-between" }} isColumn={false}>
          <MaiFooterCol>
            <div className="mai-link">
              <a href="#">Des questions? Contactez-nous.</a>
            </div>
            <MaiUL>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Relations avec les investisseurs</a>
              </li>
              <li>
                <a href="#">Confidentialité</a>
              </li>
              <li>
                <a href="#">Test de rapidité</a>
              </li>
            </MaiUL>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Langages
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={language}
                label="Langages"
                onChange={handleChange}
              >
                <MenuItem value={"fr"}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Language style={{ marginRight: "0.5em" }} />
                    Français
                  </div>
                </MenuItem>
                <MenuItem value={"en"}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Language style={{ marginRight: "0.5em" }} />
                    Anglais
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
            <span
              style={{
                color: "#b6b6b6",
                letterSpacing: "1px",
                marginTop: "1rem",
                fontSize: "1em",
              }}
            >
              MaiFlix Mali
            </span>
          </MaiFooterCol>
          <MaiFooterCol>
            <div className="mai-link"></div>
            <MaiUL>
              <li>
                <a href="#">Centre d'aide</a>
              </li>
              <li>
                <a href="#">Emplois</a>
              </li>
              <li>
                <a href="#">Préférences relatives aux cookies</a>
              </li>
              <li>
                <a href="#">Mentions légales</a>
              </li>
            </MaiUL>
          </MaiFooterCol>
          <MaiFooterCol>
            <div className="mai-link"></div>
            <MaiUL>
              <li>
                <a href="#">Compte</a>
              </li>
              <li>
                <a href="#">Façons de regarder</a>
              </li>
              <li>
                <a href="#">Information d'entreprise</a>
              </li>
              <li>
                <a href="#">Uniquement sur Netflix</a>
              </li>
            </MaiUL>
          </MaiFooterCol>
          <MaiFooterCol>
            <div className="mai-link"></div>
            <MaiUL>
              <li>
                <a href="#">Centre des médias</a>
              </li>
              <li>
                <a href="#">Conditions d'utilisation</a>
              </li>
              <li>
                <a href="#">Contactez-nous</a>
              </li>
            </MaiUL>
          </MaiFooterCol>
        </Section>
      </div>
    </ThemeProvider>
  );
};

export default Home;
