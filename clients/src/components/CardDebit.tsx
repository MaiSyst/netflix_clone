import {Stack } from "@mui/material";

type cardDebitType = {
  src: string;
  size?: 25;
  border?:string
};
const CardDebit = ({
  src,
  size,
  border = "1px solid rgba(146, 146, 146, 0.815)",
}: cardDebitType) => {
  return (
    <Stack
      width={size}
      height={size}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        border: border,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt="exprexx_card"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </Stack>
  );
};

export default CardDebit;