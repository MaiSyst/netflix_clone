import { Favorite } from "@mui/icons-material";
import { Box, Modal, Typography, IconButton, CircularProgress } from "@mui/material";
import ReactPlayer from "react-player";
import IMaiMovies from "../utils/interfaces/IMaiMovies";
import { IMAGEAPI } from "../utils/Constant";

interface IMaiModalProps {
  item: IMaiMovies;
  trailers:Array<string>;
  open: boolean;
  isFavorite: boolean;
  onFavorite: () => void;
  closeModal: (isOpen: boolean) => void;
}
const MaiModal = ({
  open,
  closeModal,
  isFavorite = false,
  onFavorite,
  trailers,
  item
}: IMaiModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => closeModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ width: "100%", height: 350 }}>
          {item !== undefined || trailers !== undefined ? (
            <ReactPlayer
              controls
              width={"100%"}
              height={350}
              playing
              url={trailers[Math.floor(Math.random() * trailers.length)]}
              light={
                <img
                  src={IMAGEAPI + "/" + item.backdrop_path}
                  alt={item.backdrop_path}
                  width={600}
                  height={350}
                  style={{ objectFit: "cover" }}
                />
              }
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
        <Box>
          <Typography
            variant="h4"
            id="modal-modal-description"
            sx={{ mt: 2, color: "white" }}
          >
            {item.title}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography id="modal-modal-description" sx={{ color: "white" }}>
            {item.overview}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, height: 100,display:'flex',alignItems:'center'}}>
          <Typography id="modal-modal-description" sx={{ color: "white" }}>
            Favories
          </Typography>
          <IconButton onClick={() => onFavorite()}>
            <Favorite color={isFavorite ? "error" : "disabled"} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: { xs: "100%", md: "80%", sm: "80%" },
  bgcolor: "black",
  border: "2px solid #252525",
  boxShadow: 24,
  borderRadius: 5,
  pt: 2,
  px: 4,
  pb: 3,
  "&:focus": {
    border: "2px solid #252525",
  },
};
export default MaiModal;
