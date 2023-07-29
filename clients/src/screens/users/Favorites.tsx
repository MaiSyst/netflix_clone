import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMaiFetchVideoTrailer } from "../../hooks/MaiHook";
import { useMaiAddFavorite, useMaiFetchFavorite, useMaiRemoveFavorite } from "../../hooks/MaiHookFavorite";
import { IMAGEAPI } from "../../utils/Constant";
import MaiModal from "../../components/MaiModal";
import Authorized from "../../utils/Authorized";
import { useNavigate } from "react-router-dom";
import IMaiMovies from "../../utils/interfaces/IMaiMovies";
import { IMaiFavoriteMessage } from "../../utils/MaiFavorite";

const Favorites = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<IMaiMovies>({} as IMaiMovies);
  const { trailers, setMovie_idChange } = useMaiFetchVideoTrailer(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [messageInfoFavorite, setMessageInfoFavorite] = useState("");
  const { data, setReload,setData, loading, setLoading } = useMaiFetchFavorite();
  const dataMemo = useMemo(() => data, [data]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [isAddToFavorite, setIsAddToFavorite] = useState(false);
     const removeToFavorite = useCallback(
       (movie: number) => {
         useMaiRemoveFavorite(movie)
           .then((result: IMaiFavoriteMessage) => {
             if (result.message === "success") {
               setIsAddToFavorite(true);
               setOpenSnackBar(true);
               setMessageInfoFavorite("Film a ete retire dans le favori.");
             } else {
               setIsAddToFavorite(false);
               setMessageInfoFavorite("Film n'a pas puis etre retire dans le favori.");
               setOpenSnackBar(true)
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
       [data]
     );
    useEffect(() => {
      Authorized()
        .then((res) => (res ? setAuth(res) : navigate("/")))
        .catch(() => navigate("/"));
    }, [navigate]);
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
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {dataMemo.length === 0 ? (
            <Box
              sx={{
                position: "absolute",
                left: "40%",
                top: "50%",
                transform: "translate(-40% -50%)",
                width: "100%",
                height: "60vh",
              }}
            >
              <Typography variant="h4" sx={{ color: "white" }}>
                Pas de Favorites
              </Typography>
            </Box>
          ) : (
            dataMemo.map((item) => (
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
          isFavorite={true}
          onFavorite={() => {
            let index = data.findIndex((d) => d.id === modalInfo.id);
            if (index !== -1) {
              let dataCopy = [...data];
              dataCopy.splice(index, 1);
              setData(dataCopy);
              removeToFavorite(modalInfo.id);
              setOpenModal(false);
            }
          }}
        />
      </div>
    )
  );
};

export default Favorites;
