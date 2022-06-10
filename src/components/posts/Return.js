import { Box, Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Return = ({ handleClickBackHistory }) => {
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          color="primary"
          aria-label="regresar"
          onClick={handleClickBackHistory}
        >
          <ArrowBackIcon />
        </Fab>
      </Box>
    </>
  );
};
