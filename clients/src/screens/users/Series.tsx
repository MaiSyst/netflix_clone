import { useEffect, useMemo, useState } from "react";
import Authorized from "../../utils/Authorized";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { IMAGEAPI } from "../../utils/Constant";
import { IMoviesServer, useMaiFetchMovies } from "../../hooks/MaiHook";
import { IGenre } from "../../utils/interfaces/IMaiGenre";

const Series = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [genre, setGenre] = useState(new Array<IGenre>());
  const [genreSelected, setGenreSelected] = useState(0);
  const { data, loading, setReload, setData } = useMaiFetchMovies(1, "tv");
  const dataMemo = useMemo<IMoviesServer[]>(() => data, [data]);
  const searchData = useOutletContext<Array<IMoviesServer>>();
  useEffect(()=>{
    console.log(data)
  },[data])
  useEffect(() => {
    Authorized()
      .then((res) => (res ? setAuth(res) : navigate("/")))
      .catch(() => navigate("/"));
  }, [navigate]);
  return (
    auth && (
      <div>
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
          <TextField
            id="filled-select-currency"
            select
            label="Genres"
            defaultValue={genreSelected}
            variant="filled"
            sx={{ width: { xs: "100%", md: "20%", sm: "20%" } }}
          >
            <MenuItem key={0} value={0}>
              Tous
            </MenuItem>
            {genre.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
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
                          navigate(`/series/details/${item.id}`, {
                            state: { image: item.backdrop_path,name:item.name,id:item.id},
                          });
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
                                {item.name}
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
      </div>
    )
  );
};

export default Series;
