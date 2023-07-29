import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface ICardExpandable {
  title: string;
  onHandleExpanded: (isExpand:boolean)=>void,
  isExpanded:boolean,
  description:string
}
const CardExpandable = ({title,description,onHandleExpanded,isExpanded}:ICardExpandable) => {
    
  return (
    <Accordion
      expanded={isExpanded}
      onChange={(e, isExpand) => onHandleExpanded(isExpand)}
      style={{ backgroundColor: "#222223",marginBottom:"1rem" }}
    >
      <AccordionSummary
        expandIcon={
          !isExpanded ? (
            <Add color="primary" fontSize="large" />
          ) : (
            <Remove color="primary" fontSize="large" />
          )
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ height: "5em" }}
      >
        <Typography
          sx={{
            width: "33%",
            flexShrink: 0,
            color: "white",
            fontSize: "1.5em",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: "white", fontSize: "1.5em" }}>
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CardExpandable;