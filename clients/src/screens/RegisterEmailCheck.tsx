import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Link,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import netflix from "../assets/img/netflix_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import { CheckCircle, Email, Send } from "@mui/icons-material";
import { useMaiConfirmedEmail } from "../hooks/MaiHookRegister";
import { API_IMAGE } from "../utils/Core";
import MaiLogin from "../utils/MaiLogin";
const RegisterEmailCheck = () => {
  const [confirmCode, setConfirmCode] = useState("");
  const [counterSecond, setCounterSecond] = useState(59);
  const [counterMinute, setCounterMinute] = useState(2);
  const [counterStop, setCounterStop] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState({message:"",sucess:false});
  const [username,setUsername]=useState("");
  const [imageProfil,setImageProfil]=useState<File|null>(null);
  const [currentProfile, setCurrentProfile] = useState(
    API_IMAGE + "/user.png"
  );
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
    const timer = setInterval(() => onHandleTimer(), 1000);
    if (counterStop) clearInterval(timer);
    
    return () => clearInterval(timer);
  });
  const onHandleTimer = () => {
    if (counterMinute <= 0&&counterSecond<=0){
        setCounterStop(true);
        setCounterMinute(0);
        setCounterSecond(0);
        console.log("Stopped")
        return
    }
    if (counterSecond <= 0) {
      setCounterMinute(counterMinute - 1);
      setCounterSecond(59);
    }
    setCounterSecond(counterSecond-1);
  };

  const onHandleConfirmEmail = () => {
    
    if(counterMinute!==0&&counterSecond!==0){
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useMaiConfirmedEmail(location.state.email, parseInt(confirmCode))
        .then((result) => {
          if (result?.message === "success") {
            setConfirmedEmail({
              message: "Email a ete confirme",
              sucess: true,
            });
            setUsername(result.username)
          } else {
            setConfirmedEmail({
              message: "Error de confirmation",
              sucess: false,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const onHandleProfil=()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = () => {
      if(input.files!==null){
        const file = input.files[0];
        if (file.type.startsWith("image")){
          setImageProfil(file);
          setCurrentProfile(URL.createObjectURL(file));
        } 
      }
     
    };
    input.click();
  }
  const onHandleFinishRegister=()=>{
    if(imageProfil!==null){
      MaiLogin.updateusernameProfil(
        location.state.email,
        username,
        imageProfil
      ).then(result=>{
        if(result?.message==="success"){
          navigate("/login")
        }
      })
      .catch(err=>console.error(err));
    }
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
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {confirmedEmail.sucess ? (
              <Box sx={{ my: 30 }}>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  direction={"row"}
                  mb={2}
                >
                  <CheckCircle
                    sx={{ width: 50, height: 50, mr: 1 }}
                    color="success"
                  />
                  <Typography color="green" variant="h4">
                    Email a ete Confirme
                  </Typography>
                </Stack>
                <Card
                  variant="outlined"
                  sx={{
                    minWidth: 300,
                    height: 500,
                    paddingInline: 5,
                    borderRadius: 3,
                  }}
                >
                  <Stack
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    height={"100%"}
                  >
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      alt={username}
                      src={currentProfile}
                    />
                    <Button
                      onClick={onHandleProfil}
                      sx={{ my: 2, mb: 5 }}
                      variant="contained"
                    >
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        variant="body2"
                      >
                        Changer Profile
                      </Typography>
                    </Button>
                    <TextField
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth={true}
                      sx={{ width: "100%" }}
                      label="Nom d'utilisateur"
                    />
                    <Button
                      onClick={onHandleFinishRegister}
                      sx={{ my: 2, width: "100%" }}
                      size="large"
                      variant="contained"
                    >
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        variant="body2"
                      >
                        Terminer
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => navigate("/users")}
                      sx={{ my: 2 }}
                      variant="text"
                    >
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        variant="body2"
                      >
                        Sauter
                      </Typography>
                    </Button>
                  </Stack>
                </Card>
              </Box>
            ) : (
              <Box sx={{ my: 30 }}>
                <Typography
                  sx={{ textAlign: "center", mb: 3 }}
                  color="white"
                  variant="h2"
                >
                  {`${
                    counterMinute < 10 ? "0" + counterMinute : counterMinute
                  }:${
                    counterSecond < 10 ? "0" + counterSecond : counterSecond
                  }`}
                </Typography>
                <Typography
                  sx={{ textAlign: "center", mb: 3 }}
                  color="white"
                  variant="h4"
                >
                  Code confirmation a ete envoye.
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  color="white"
                  variant="body1"
                >
                  <Send sx={{ mr: 1 }} />
                  {location.state.email}
                </Typography>

                <TextField
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  sx={{ width: "100%" }}
                  label="Code de confirmation"
                  disabled={counterMinute === 0 && counterSecond === 0}
                />
                <Button sx={{ my: 2 }} variant="text">
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    variant="body2"
                  >
                    Renvoyer la confirmation
                  </Typography>
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    height: "5em",
                    backgroundColor: "red",
                    my: 4,
                  }}
                  disabled={counterMinute === 0 && counterSecond === 0}
                  color="error"
                  variant="contained"
                  onClick={() => onHandleConfirmEmail()}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "400", textTransform: "capitalize" }}
                  >
                    Suivant
                  </Typography>
                </Button>
              </Box>
            )}
          </Stack>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterEmailCheck;
