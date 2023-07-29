import { Container, Stack, Typography } from "@mui/material"

const NotFoundPage=()=>{
    return (
      <Container>
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height={'70vh'}
        >
          <Typography variant="h1" fontSize={"20rem"} color={"white"}>
            404
          </Typography>
          <Typography variant="h2" color={"white"}>
            Page n'est pas trouve
          </Typography>
        </Stack>
      </Container>
    );
}

export default NotFoundPage;