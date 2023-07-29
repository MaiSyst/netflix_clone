import { useEffect, useState } from "react";
import Authorized from "../../utils/Authorized";
import { useLocation, useNavigate } from "react-router-dom";
import MaiHugeImage from "../../components/HugeImage";
import { AppBar, Box, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { IMAGEAPI } from "../../utils/Constant";
import { Header, ImageBackground } from "../../styles/Home.style";
import { useMaiFetchSeriesDetail } from "../../hooks/MaiHook";

const DetailsSeries=()=>{
    const navigate = useNavigate();
    const location=useLocation();
    const [auth, setAuth] = useState(false);
    const [imageBack, setImageBack] = useState("");
    const [title, setTitle] = useState("");
    const {seasons,number_of_episodes}=useMaiFetchSeriesDetail(location.state.id)
    const [selectedSeason,setSelectedSeason]=useState(0)
    const [seasonEpisode, setSeasonEpisode] = useState(0);
    const theme = createTheme({
      palette: { mode: "dark" },
    });
    useEffect(() => {
      if (seasons !== undefined) {
        setSelectedSeason(seasons[0].id)
        let index=seasons.findIndex(season=>season.id=selectedSeason)
        console.log(index)
        let episodesNumber = seasons[index] ?seasons[index].episode_count:0;
        setSeasonEpisode(episodesNumber)
      }
    }, [seasons]);
    useEffect(() => {
      if (seasons !== undefined) {
        let index=seasons.findIndex(season=>season.id=selectedSeason)
        console.log(index)
        let episodesNumber = seasons[index] ?seasons[index].episode_count:0;
        setSeasonEpisode(episodesNumber)
      }
    }, [selectedSeason]);
    useEffect(() => {
      Authorized()
        .then((res) => (res ? setAuth(res) : navigate("/")))
        .catch(() => navigate("/"));
    }, [navigate]);
    useEffect(()=>{
      setImageBack(location.state.image);
      setTitle(location.state.name);
    },[navigate])
    return (
      auth && (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <AppBar
              component="nav"
              elevation={0}
              sx={{
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => navigate("/users/series")}
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIos />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  {title}
                </Typography>
              </Toolbar>
            </AppBar>
            <ImageBackground image={IMAGEAPI + "/" + imageBack} />
            <Box>
              <Typography variant="h1">{title}</Typography>
              <Typography variant="h3">{title}</Typography>
              <Stack direction={"row"}>
                <FormControl
                  variant="filled"
                  sx={{ width: { xs: "100%", md: "20%", sm: "20%" } }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Saisons
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectedSeason}
                    onChange={(e) => {
                      let value = e.target.value as number;
                      setSelectedSeason(value);
                    }}
                  >
                    {seasons !== undefined ? (
                      seasons.map((season) => (
                        <MenuItem key={season.id} value={season.id}>
                          {season.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem key={0} value={0}>
                        Loading
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  sx={{ width: { xs: "100%", md: "20%", sm: "20%" } }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Episodes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={0}
                  >
                    {seasons !== undefined ? (
                      new Array(seasonEpisode).fill(0).map((_, i) => (
                        <MenuItem key={i * seasonEpisode} value={i}>
                          Episode {i + 1}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem key={0} value={0}>
                        Loading
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Container>
        </ThemeProvider>
      )
    );
}

export default DetailsSeries;