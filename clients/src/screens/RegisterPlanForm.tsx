import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Container,
  Card,
  Typography,
  Divider,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import netflix from "../assets/img/netflix_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, CheckCircle, Login } from "@mui/icons-material";
import { useEffect, useState } from "react";
import abonnementData from "../data/dataAbonnement";
import {motion} from 'framer-motion';

const RegisterPlanForm = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [selectedCard, setSelectedCard] = useState("Prime");
  const [selectedCardMove, setSelectedCardMove] = useState(1);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  useEffect(()=>{
    const onResized=()=>{
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize",onResized)
    return ()=>window.removeEventListener("resize",onResized)
  },[])
  const onHandleClickCard = (e: any) => {
    setSelectedCard(e);
  };
  return (
    <>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              width={80}
              height={80}
              style={{ fill: "red" }}
              src={netflix}
              alt="Logo"
            />
          </Box>

          <Box sx={{ display: { xs: "block", sm: "block" } }}>
            <Link
              component="button"
              variant="h6"
              onClick={() => navigate("/login")}
              sx={{
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
                transition: "0.3s",
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "red" },
              }}
            >
              S'identifier
            </Link>
            <Link
              component="button"
              variant="h6"
              onClick={() => navigate("/login")}
              sx={{
                display: { xs: "flex", md: "none" },
                textDecoration: "none",
                transition: "0.3s",
                color: "rgba(255,255,255,0.6)",
                "&:hover": { color: "red" },
              }}
            >
              <Login />
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
        <Container sx={{ py: 15 }}>
          <Stack justifyContent="center" alignItems="center">
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{
                display: { sm: "none", xs: "none", height: "50%", md: "flex" },
                width: "100%",
              }}
            >
              {abonnementData.map((abonnment) => (
                <Card
                  key={abonnment.type}
                  variant="outlined"
                  sx={{
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor:
                      selectedCard === abonnment.type
                        ? abonnment.color.split(",")[1]
                        : "rgba(255,255,255,0.2)",

                    overflow: "hidden",
                    transform:
                      selectedCard === abonnment.type
                        ? "scale(1)"
                        : "scale(0.90)",
                    cursor: "pointer",
                    transition: "0.35s ease-in-out",
                  }}
                  id={abonnment.type}
                  onClick={() => onHandleClickCard(abonnment.type)}
                >
                  <Box
                    sx={{
                      m: 2,
                      p: 3,
                      borderRadius: 2,
                      background:
                        "linear-gradient(-90deg," + abonnment.color + ")",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {abonnment.type}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {abonnment.amount}
                    </Typography>
                  </Box>
                  <Box>
                    {abonnment.options.map((option, i) => (
                      <Box key={option.title}>
                        <Stack
                          direction={"row"}
                          sx={{ p: 2 }}
                          justifyContent={"start"}
                          alignItems={"start"}
                        >
                          <CheckCircle
                            sx={{
                              width: 35,
                              color:
                                selectedCard === abonnment.type
                                  ? abonnment.color.split(",")[1]
                                  : "rgba(255,255,255,0.4)",
                              height: 35,
                              mr: 2,
                            }}
                          />
                          <Stack justifyContent={"center"} alignItems={"start"}>
                            <Typography
                              sx={{ color: "rgba(255,255,255,0.6)" }}
                              variant="body1"
                            >
                              {option.title}
                            </Typography>
                            <Typography
                              sx={{ wordWrap: "break-word", color: "white" }}
                              variant="body1"
                            >
                              {option.subtitle.split("@").join(" ")}
                            </Typography>
                          </Stack>
                        </Stack>
                        {i !== abonnment.options.length - 1 ? (
                          <Divider />
                        ) : null}
                      </Box>
                    ))}
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{
                        transition: "0.5s ease-in",
                        transform:
                          selectedCard === abonnment.type
                            ? "translateY(-5px)"
                            : "translateY(200px)",
                      }}
                    >
                      <Check sx={{ color: abonnment.color.split(",")[1] }} />
                      <Typography
                        color={abonnment.color.split(",")[1]}
                        sx={{ textAlign: "center", ml: 1, fontWeight: 500 }}
                        variant="body2"
                      >
                        Selected
                      </Typography>
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Stack>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
              <Stack
                direction={"row"}
                sx={{
                  display: { sm: "flex", xs: "flex", md: "none" },
                  width: "100%",
                  height: "auto",
                  transition: "0.5s",
                  transform: `translateX(${
                    ((windowWidth - 40) / abonnementData.length) *
                    selectedCardMove
                  }px)`,
                }}
              >
                {abonnementData.map((abonnment) => (
                  <Box
                    key={abonnment.type}
                    sx={{
                      minWidth: (windowWidth + 40) / abonnementData.length,
                      marginInline: "10px",
                      height: "120px",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      transition: "transform 0.5s",
                      transform: `${
                        selectedCard === abonnment.type
                          ? "scale(1)"
                          : "scale(0.85)"
                      }`,
                      cursor: "pointer",
                      border: `${
                        selectedCard === abonnment.type
                          ? "2px solid #fff"
                          : "2px solid #ffffff0"
                      }`,
                      background:
                        "linear-gradient(-90deg," + abonnment.color + ")",
                    }}
                    onClick={() => {
                      setSelectedCard(abonnment.type);
                      switch (abonnment.type) {
                        case "Prime":
                          setSelectedCardMove(1);
                          break;
                        case "Standard":
                          setSelectedCardMove(0);
                          break;
                        case "Basique":
                          setSelectedCardMove(-1);
                          break;
                        case "Mobile":
                          setSelectedCardMove(-2);
                          break;
                        default:
                          break;
                      }
                    }}
                  >
                    <Typography
                      color="white"
                      variant="h5"
                      sx={{ fontWeight: 500 }}
                    >
                      {abonnment.type}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {abonnment.amount}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Stack
              direction={"row"}
              my={5}
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
            >
              {abonnementData.map((ab) => (
                <Box
                  key={ab.type}
                  sx={{
                    width: "15px",
                    mr: 1,
                    height: "15px",
                    transition: "0.5s ease-in-out",
                    backgroundColor:
                      selectedCard === ab.type
                        ? ab.color.split(",")[1]
                        : "rgba(255,255,255,0.4)",
                    borderRadius: "15px",
                    cursor: "pointer",
                    transform:
                      selectedCard === ab.type ? "scale(1)" : "scale(0.8)",
                  }}
                  onClick={() => {
                    setSelectedCard(ab.type);
                    switch (ab.type) {
                      case "Prime":
                        setSelectedCardMove(1);
                        break;
                      case "Standard":
                        setSelectedCardMove(0);
                        break;
                      case "Basique":
                        setSelectedCardMove(-1);
                        break;
                      case "Mobile":
                        setSelectedCardMove(-2);
                        break;
                      default:
                        break;
                    }
                  }}
                ></Box>
              ))}
            </Stack>
            <Box
              sx={{
                width: "80%",
                py: 5,
                margin: "auto",
                overflow: "hidden",
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            >
              <List>
                {abonnementData[
                  abonnementData.findIndex((ab) => ab.type === selectedCard)
                ].options.map((opt) => (
                  <ListItem key={opt.title}>
                    <ListItemIcon>
                      <CheckCircle
                        sx={{
                          width: 35,
                          color:
                            abonnementData[
                              abonnementData.findIndex(
                                (ab) => ab.type === selectedCard
                              )
                            ].color.split(",")[1],
                          height: 35,
                          mr: 2,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary={opt.title} />
                    <Box>
                      <ListItemText
                        sx={{ color: "white" }}
                        primary={opt.subtitle}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              sx={{ my: { sm: 20, xs: 20, md: 0 } }}
            >
              <Box sx={{ my: 3, width: "100%" }}>
                <Typography sx={{ color: "grey" }} variant="subtitle1">
                  HD (720p), Full HD (1080p), Ultra HD (4K) et HDR disponibles
                  sous réserve de votre service Internet et des capacités de
                  votre appareil. Tout le contenu n'est pas disponible dans
                  toutes les résolutions. Consultez nos conditions d'utilisation
                  pour plus de détails. Seules les personnes qui vivent avec
                  vous peuvent utiliser votre compte. Regardez sur 4 appareils
                  différents en même temps avec Premium, 2 avec Standard et 1
                  avec Basic et Mobile.
                </Typography>
              </Box>
              <Button
                sx={{
                  width: "40%",
                  height: "5em",
                  my: "1rem",

                  backgroundColor: "red",
                }}
                color="error"
                variant="contained"
                onClick={() =>
                  navigate("/register/paymentPicker", {
                    state: { ...location.state, suscribe: selectedCard },
                  })
                }
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "400", textTransform: "capitalize" }}
                >
                  Suivant
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterPlanForm;
