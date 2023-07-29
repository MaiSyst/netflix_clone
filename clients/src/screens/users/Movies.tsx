import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  IMoviesServer,
  useMaiFetchGenreMovies,
  useMaiFetchMovies,
  useMaiFetchMoviesByGenre,
  useMaiFetchVideoTrailer,
} from "../../hooks/MaiHook";
import { IMAGEAPI } from "../../utils/Constant";
import MaiModal from "../../components/MaiModal";
import IMaiMovies from "../../utils/interfaces/IMaiMovies";
import Authorized from "../../utils/Authorized";
import {
  useMaiAddFavorite,
  useMaiFetchFavorite,
  useMaiRemoveFavorite,
} from "../../hooks/MaiHookFavorite";
import { IMaiFavoriteMessage } from "../../utils/MaiFavorite";

const Movies = () => {
  const [genreSelected, setGenreSelected] = useState(0);
  const { data, loading, setReload, setData } = useMaiFetchMovies();
  const dataMemo = useMemo<IMoviesServer[]>(() => data, [data]);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<IMaiMovies>({} as IMaiMovies);
  const searchData = useOutletContext<Array<IMoviesServer>>();
  const [isAddToFavorite, setIsAddToFavorite] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageInfoFavorite, setMessageInfoFavorite] = useState("");
  const [dataFavorite, setDataFavorite] = useState(new Array<IMaiMovies>());
  const { setGenreChange, genreChange, itemsMoviesGenre, setNextPage } =
    useMaiFetchMoviesByGenre();
  const favoriteMovies = useMaiFetchFavorite();
  const { genres } = useMaiFetchGenreMovies();
  useEffect(() => {
    if (genreSelected !== 0 && genreChange === genreSelected) {
      setGenreChange(genreSelected);
      setData(itemsMoviesGenre);
    }
  }, [genreChange, genreSelected, itemsMoviesGenre, setData, setGenreChange]);
  useEffect(() => {
    if (favoriteMovies) {
      setDataFavorite(favoriteMovies.data);
    }
  }, [dataFavorite, favoriteMovies]);
  const addToFavorite = useCallback((movie: IMaiMovies) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMaiAddFavorite(movie)
      .then((result: IMaiFavoriteMessage) => {
        if (result.message === "success") {
          setIsAddToFavorite(true);
          setOpenSnackBar(true);
          setMessageInfoFavorite("Film a ete ajouter dans le favori.");
        } else {
          setIsAddToFavorite(false);
          setOpenSnackBar(true);
          setMessageInfoFavorite(
            "Film n'a pas puis etre ajoute dans le favori."
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setIsAddToFavorite(false);
        setOpenSnackBar(true);
        setMessageInfoFavorite("Film n'a pas puis etre ajoute dans le favori.");
      });
  }, []);
  const removeToFavorite = useCallback(
    (movie: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useMaiRemoveFavorite(movie)
        .then((result: IMaiFavoriteMessage) => {
          if (result.message === "success") {
            setIsAddToFavorite(true);
            setOpenSnackBar(true);
            setMessageInfoFavorite("Film a ete retire dans le favori.");
          } else {
            setIsAddToFavorite(false);
            setOpenSnackBar(true);
            setMessageInfoFavorite(
              "Film n'a pas puis etre retire dans le favori."
            );
          }
        })
        .catch((err) => {
          console.error(err);
          setIsAddToFavorite(false);
          setOpenSnackBar(true);
          setMessageInfoFavorite(
            "Film n'a pas puis etre retire dans le favori."
          );
        });
    },
    []
  );

  const { trailers, setMovie_idChange } = useMaiFetchVideoTrailer(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Authorized()
      .then((res) => (res ? setAuth(res) : navigate("/")))
      .catch(() => navigate("/"));
  }, [navigate]);
  useEffect(() => {
    if (searchData !== undefined) {
      setData(searchData);
    }
  }, [searchData, setData]);

  useEffect(() => {
    const fetchMost = () => {
      if (searchData === undefined || searchData.length === 0) {
        const limitScroll =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight + 100;
        if (limitScroll) {
          if (genreSelected === 0) {
            setReload((prev) => prev + 1);
          } else {
            setNextPage((prev) => prev + 1);
          }
        }
      }
    };
    window.addEventListener("scroll", fetchMost);
    return () => window.removeEventListener("scroll", fetchMost);
  }, [searchData, genreSelected, setReload, setNextPage]);
  return (
    auth && (
      <div>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpenSnackBar(false)}
        >
          <Alert
            onClose={() => setOpenSnackBar(false)}
            severity={!isAddToFavorite ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {messageInfoFavorite}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginBottom: "2rem",
            backgroundColor: "black",
            position: "sticky",
            top: "8%",
            left: 0,
            zIndex: 50,
          }}
        >
          <FormControl
            variant="filled"
            sx={{ width: { xs: "100%", md: "20%", sm: "20%" } }}
          >
            <InputLabel id="demo-simple-select-filled-label">Genres</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={genreSelected}
              onChange={(e) => {
                const value = e.target.value as number;
                setGenreSelected(value);
                console.log(value);
                if (value === 0) {
                  //setReload(1);
                } else {
                  setGenreChange(value);
                }
              }}
            >
              <MenuItem key={0} value={0}>
                Tous
              </MenuItem>
              {genres.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {dataMemo.length === 0
            ? new Array(50).fill(1).map((_, k) => (
                <Grid item xs={2} sm={4} md={4} key={k}>
                  <Card
                    sx={{
                      minWidth: 250,
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease-in-out",
                      position: "relative",
                      height: "300px",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardActionArea>
                      <Box
                        sx={{
                          position: "absolute",
                          backgroundColor: "#333333",
                          height: "200px",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            height: 150,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress color="error" />
                        </Box>
                      </Box>
                      <CardContent>
                        <Box sx={{ position: "relative", height: "260px" }}>
                          <Box
                            sx={{
                              position: "absolute",
                              backgroundColor: "#383838",
                              bottom: 30,
                              borderRadius: 5,
                              height: "25px",
                              width: "80%",
                            }}
                          ></Box>
                          <Box
                            sx={{
                              position: "absolute",
                              backgroundColor: "#636363",
                              marginTop: "1rem",
                              borderRadius: 5,
                              bottom: 0,
                              height: "20px",
                              width: "60%",
                            }}
                          ></Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            : dataMemo.map((items) =>
                items.items.map((item) => (
                  <Grid item xs={2} sm={4} md={4} key={item.id}>
                    {loading ? (
                      <Card
                        sx={{
                          minWidth: 250,
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.2s ease-in-out",
                          position: "relative",
                          height: "300px",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardActionArea>
                          <Box
                            sx={{
                              position: "absolute",
                              backgroundColor: "#636363",
                              height: "200px",
                              width: "100%",
                            }}
                          ></Box>
                          <CardContent>
                            <Box sx={{ position: "relative", height: "260px" }}>
                              <Box
                                sx={{
                                  position: "absolute",
                                  backgroundColor: "#383838",
                                  bottom: 30,
                                  borderRadius: 5,
                                  height: "25px",
                                  width: "80%",
                                }}
                              ></Box>
                              <Box
                                sx={{
                                  position: "absolute",
                                  backgroundColor: "#636363",
                                  marginTop: "1rem",
                                  borderRadius: 5,
                                  bottom: 0,
                                  height: "20px",
                                  width: "60%",
                                }}
                              ></Box>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ) : (
                      <Card
                        onClick={() => {
                          setOpenModal(true);
                          setModalInfo(item);
                          setMovie_idChange(item.id);
                        }}
                        sx={{
                          minWidth: 250,
                          height: "300px",
                          borderRadius: "0.5rem",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          transition: "all 0.2s ease-in-out",
                          position: "relative",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardActionArea>
                          <CardContent
                            sx={{ position: "relative", height: "250px" }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "200px",
                              }}
                            >
                              <img
                                height="100%"
                                width={"100%"}
                                style={{ objectFit: "cover" }}
                                src={IMAGEAPI + "/" + item.backdrop_path}
                                alt={item.backdrop_path}
                              />
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "end",
                              }}
                            >
                              <Typography
                                sx={{
                                  paddingInline: "1rem",
                                  textAlign: "center",
                                }}
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {item.title}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    )}
                  </Grid>
                ))
              )}
        </Grid>
        <MaiModal
          open={openModal}
          closeModal={(close) => {
            setOpenModal(close);
          }}
          item={modalInfo}
          trailers={trailers}
          isFavorite={
            dataFavorite
              ? dataFavorite.findIndex((d) => d.id === modalInfo.id) !== -1
              : false
          }
          onFavorite={() => {
            const index = dataFavorite.findIndex((d) => d.id === modalInfo.id);
            if (index !== -1) {
              const dataCopy = [...dataFavorite];
              dataCopy.splice(index, 1);
              setDataFavorite(dataCopy);
              removeToFavorite(modalInfo.id);
            } else {
              setDataFavorite((prev) => [...prev, modalInfo]);
              addToFavorite(modalInfo);
            }
          }}
        />
      </div>
    )
  );
};

export default Movies;
