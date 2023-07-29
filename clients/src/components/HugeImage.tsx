import styled from "@emotion/styled";
import { Info,PlayArrow } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
interface IMaiHugeImage{
    image:string,
    title:string,
    description:string
}
const MaiHugeImage = ({ image,title,description }: IMaiHugeImage) => {
  return (
    <MaiImage image={image}>
      <MaiInfo>
        <div className="title">
          <Typography color={"white"} sx={{ fontWeight: "bold" }} variant="h1">
              {title}
          </Typography>
        </div>
        <div className="description">
          <Typography
            color={"#afafafec"}
            sx={{ fontWeight: 400, marginTop: "2rem", marginLeft: "1rem",height:'100%',wrap:"true" }}
            variant="h5"
          >
              {description}
          </Typography>
        </div>
        <div
          className="actionsMore"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            sx={{
              width: "30%",
              height: "4em",
              marginTop: "2rem",
              borderRadius: "2rem",
              backgroundColor:'white',
            }}
            size="large"
            variant="contained"
            startIcon={<PlayArrow sx={{width:'2em',height:'2em'}} />}
          >
            Jouer
          </Button>
          <Button
            sx={{
              width: "30%",
              height: "4em",
              marginTop: "2rem",
              marginLeft: "2rem",
              borderRadius: "2rem",
            }}
            color="info"
            size="large"
            variant="outlined"
            endIcon={<Info />}
          >
            Voir Details
          </Button>
        </div>
      </MaiInfo>
    </MaiImage>
  );
};

const MaiImage = styled.div<{ image: string }>`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.image}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: -1;
  .title {
    overflow: hidden;
    height: 25%;
    h1 {
      transform: translateY(400px);
      animation: 1000ms slideInTitle forwards
        cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
  .description {
    overflow: hidden;
    height: 40%;
    h5 {
      transform: translateY(400px);
      animation: 1500ms slideInTitle forwards
        cubic-bezier(0.075, 0.82, 0.165, 1);
      animation-delay: 200ms;
    }
  }
  .actionsMore {
    button {
      transform: translateY(400px);
      animation: 2000ms slideInTitle forwards
        cubic-bezier(0.075, 0.82, 0.165, 1);
      animation-delay: 300ms;
    }
  }
  .actionPlay {
    button {
      transform: scale(0);
      animation: 2200ms scaleAndRotate forwards
        cubic-bezier(0.075, 0.82, 0.165, 1);
      animation-delay: 300ms;
    }
  }
  @keyframes scaleImage {
    from {
      transform: translateY(-400px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes scaleAndRotate {
    from {
      transform: rotate(-360deg) scale(0);
    }
    to {
      transform: rotate(360deg) scale(1);
    }
  }
  @keyframes slideInTitle {
    from {
      transform: translateY(400px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;
const MaiInfo=styled.div`
    display: flex;
    height: 100%;
    width: 40%;
    margin-left: 2rem;
    flex-direction: column;
    justify-content: center;
    z-index: 1;
`
export default MaiHugeImage;