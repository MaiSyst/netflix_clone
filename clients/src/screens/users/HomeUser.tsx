import { Typography } from "@mui/material";
import MaiHugeImage from "../../components/HugeImage";
import { motion } from "framer-motion";

import { MaiCarouselBasic } from "../../components/MaiCarousel";
import { IMAGEAPI } from "../../utils/Constant";
import {
  useMaiFetchTrending,
  useMaiFetchMoviesByGenres,
  useMaiFetchMoviesPopular,
  useMaiFetchMoviesTopRated,
  useMaiFetchMoviesUpcoming,
  useMaiFetchMovies,
} from "../../hooks/MaiHook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Authorized from "../../utils/Authorized";

const HomeUser = () => {
  const heightCarousel = "300px";
  const itemsTopRatedMovies = useMaiFetchMoviesTopRated();
  const genres = [
    { id: 35, name: "Comedy" },
    { id: 99, name: "Documentary" },
    { id: 28, name: "Action" },
    { id: 16, name: "Animation" },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const genreDataMoviesServer = useMaiFetchMoviesByGenres(genres);
  const itemPopularMovies = useMaiFetchMoviesPopular(
    Math.floor(Math.random() * 20)
  );
  const itemUpcomingMovies = useMaiFetchMoviesUpcoming(
    Math.floor(Math.random() * 20)
  );
  const itemsTrendingMovies = useMaiFetchTrending(
    Math.floor(Math.random() * 50)
  );
  const { imageRandom, titleRandom, descRandom } = useMaiFetchMovies();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Authorized()
      .then((res) => (res ? setAuth(res) : navigate("/")))
      .catch(() => navigate("/"));
  }, [navigate]);
  return (
    auth && (
      <section
        style={{
          height: "100%",
          position: "absolute",
          width: "100%",
          left: 0,
          top: 0,
          backgroundColor: "black",
        }}
      >
        <MaiHugeImage
          title={titleRandom}
          description={descRandom}
          image={IMAGEAPI + "/" + imageRandom}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "0rem",
          }}
        >
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            style={{
              marginTop: "2rem",
              marginLeft: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              Popular
            </Typography>
          </motion.div>
          <MaiCarouselBasic
            items={itemPopularMovies.items}
            containerWidth="100%"
            style={{ marginInline: "20px" }}
            containerHeight={heightCarousel}
            direction="row"
            spacing={30}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "0rem",
          }}
        >
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            style={{
              marginTop: "2rem",
              marginLeft: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              Top Rated
            </Typography>
          </motion.div>
          <MaiCarouselBasic
            items={itemsTopRatedMovies.items}
            containerWidth="100%"
            style={{ marginInline: "20px" }}
            containerHeight={heightCarousel}
            direction="row"
            spacing={30}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "0rem",
          }}
        >
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            style={{
              marginTop: "2rem",
              marginLeft: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              UpComing
            </Typography>
          </motion.div>
          <MaiCarouselBasic
            items={itemUpcomingMovies.items}
            containerWidth="100%"
            style={{ marginInline: "20px" }}
            containerHeight={heightCarousel}
            direction="row"
            spacing={30}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "0rem",
          }}
        >
          <motion.div
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            style={{
              marginTop: "2rem",
              marginLeft: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              Trending now
            </Typography>
          </motion.div>
          <MaiCarouselBasic
            items={itemsTrendingMovies.items}
            containerWidth="100%"
            style={{ marginInline: "20px" }}
            containerHeight={heightCarousel}
            direction="row"
            spacing={30}
          />
        </div>
        {genreDataMoviesServer.map((it) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "0rem",
            }}
            key={it.genre}
          >
            <motion.div
              initial={{ y: -200 }}
              animate={{ y: 0 }}
              style={{
                marginTop: "2rem",
                marginLeft: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold" }}
                color="white"
              >
                {it.genre}
              </Typography>
            </motion.div>
            <MaiCarouselBasic
              items={it.items}
              containerWidth="100%"
              style={{ marginInline: "20px" }}
              containerHeight={heightCarousel}
              direction="row"
              spacing={30}
            />
          </div>
        ))}
      </section>
    )
  );
};

export default HomeUser;
