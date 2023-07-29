import styled from "@emotion/styled";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { CSSProperties, useRef, } from "react";
interface IMaiCarouselBasic {
  items: Array<IMaiMovies>;
  containerWidth: string;
  containerHeight: string;
  direction?: string;
  spacing?: number;
  spaceSide?: number;
  speedScroll?: number;
  heightCard?: string;
  widthCard?:string;
  style?: CSSProperties;
}
import IMaiMovies from "../utils/interfaces/IMaiMovies";
import { IMAGEAPI } from "../utils/Constant";
import { Card, CardActionArea, CircularProgress, CardContent, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
export const MaiCarouselBasic = ({
  items,
  containerWidth,
  containerHeight,
  direction = "row",
  spacing = 30,
  speedScroll = 0,
  style = {},
  spaceSide = 50,
  heightCard="200px",
  widthCard="400px",
}: IMaiCarouselBasic) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
      spaceSide={spaceSide}
      style={{ ...style }}
    >
      <div className="preview">
        <motion.button
          className="btnAction"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const { scrollLeft, clientWidth } = ref.current!;
            ref.current?.scrollTo({
              left: scrollLeft - clientWidth - speedScroll,
            });
          }}
        >
          <ArrowBackIos />
        </motion.button>
      </div>
      <div className="next">
        <motion.button
          className="btnAction"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const { scrollLeft, clientWidth } = ref.current!;
            ref.current?.scrollTo({
              left: scrollLeft + clientWidth + speedScroll,
            });
          }}
        >
          <ArrowForwardIos />
        </motion.button>
      </div>
      <ItemsContainer
        widthCard={widthCard}
        heightCard={heightCard}
        ref={ref}
        direction={direction}
        spacing={spacing}
      >
        {items === undefined
          ? new Array(50).fill(50).map((_, k) => (
              <Card
                key={k}
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
            ))
          : items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  minWidth: 400,
                  height: containerHeight,
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.2s ease-in-out",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  "&:hover img": {
                    opacity: 1,
                  },
                }}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      position: "relative",
                      height: "300px",
                      minWidth: 400,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
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
                        height: "110px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        zIndex: 20,
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
            ))}
      </ItemsContainer>
    </Container>
  );
};

const Container = styled(motion.div)<{
  containerWidth: string;
  containerHeight: string;
  spaceSide: number;
}>`
  width: calc(
    ${(props) => props.containerWidth} - ${(props) => props.spaceSide}px
  );
  height: ${(props) => props.containerHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem 0;
  .preview {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 50px;
    height: 50px;
  }
  .btnAction {
    background-color: #ff0606;
    border-radius: 50%;
    border: 0px solid transparent;
    width: 50px;
    height: 50px;
    color: white;
    outline: none;

    cursor: pointer;
    &:hover {
      border: 2px solid #fff;
    }
  }
  .next {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
`;

const ItemsContainer = styled.div<{
  direction: string;
  spacing: number;
  widthCard: string;
  heightCard: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.spacing}px;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  transition: 1s;
  scroll-behavior: smooth;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 500ms;
    pointer-events: none;
    opacity: 0.6;
    overflow: hidden;
  }
`;
