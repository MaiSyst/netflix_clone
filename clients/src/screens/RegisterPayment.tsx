import { useLocation, useNavigate } from "react-router-dom";
import netflix from "../assets/img/netflix_logo.svg";
import { AppBar, Backdrop, Box, CircularProgress, Container, Link, Stack, Toolbar, Typography, styled } from "@mui/material";
import { ArrowForwardIos, Lock } from "@mui/icons-material";
import { useState } from "react";
import { motion } from "framer-motion";
import CardDebit from "../components/CardDebit";
import dataCardDebit from "../data/dataCardDebit";
import MaiLogin from "../utils/MaiLogin";
const RegisterPayment=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const [isLoading, setIsLoading]=useState(false);
    const onHandlePaymentOption=()=>{
        setIsLoading(true);
        MaiLogin.register(
          location.state.email,
          location.state.password,
          location.state.suscribe
        ).then(result=>{
          if (result?.message === "success") {
            setIsLoading(false);
            navigate("/register/creditOptions", { state: location.state });
          }
          else if (result?.message === "Username or email exist") {
            setIsLoading(false);
          }else{
            setIsLoading(false);
          }
        }).catch(err=>{console.error(err)})
    }
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
            <Stack py={25} justifyContent={"center"} alignItems={"center"}>
              <Stack
                width={"50%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Lock
                  sx={{ width: "5rem", height: "5rem", color: "red", mb: 4 }}
                />
                <Typography color={"white"} variant="body2">
                  ÉTAPE 3 SUR 3
                </Typography>
                <Typography
                  mb={2}
                  textAlign={"center"}
                  color={"white"}
                  variant="h4"
                  fontWeight={600}
                >
                  Choisissez comment payer
                </Typography>
                <Typography
                  fontWeight={300}
                  textAlign={"center"}
                  color={"white"}
                  variant="h6"
                >
                  Votre paiement est crypté et vous pouvez modifier votre mode
                  de paiement à tout moment.
                </Typography>
                <Typography textAlign={"center"} color="white" variant="h6">
                  Sécurisé pour la tranquillité d'esprit. Annulez facilement en
                  ligne.
                </Typography>
                <Box my={3}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"end"}
                  >
                    <Typography
                      textAlign={"right"}
                      color="white"
                      variant="caption"
                    >
                      Chiffrement de bout en bout
                    </Typography>
                    <Lock color="warning" />
                  </Stack>
                  <Stack
                    component={motion.button}
                    whileTap={{ scale: 0.97 }}
                    justifyContent={"space-between"}
                    pl={2}
                    pr={2}
                    alignItems={"center"}
                    direction={"row"}
                    onClick={onHandlePaymentOption}
                    sx={{
                      border: "2px solid grey",
                      borderRadius: 2,
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      outline: "none",
                    }}
                    width={"100%"}
                    height={60}
                  >
                    <Stack direction={"row"} alignItems={"center2"} mr={4}>
                      <Typography
                        textAlign={"center"}
                        mr={1}
                        color="white"
                        variant="h6"
                      >
                        Carte de crédit ou de débit
                      </Typography>
                      {dataCardDebit.map(item => (
                        <CardDebit key={item.type} src={item.img} />
                      ))}
                    </Stack>
                    <ArrowForwardIos
                      className="iconArrow"
                      sx={{ color: "white" }}
                    />
                  </Stack>
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
}

export default RegisterPayment