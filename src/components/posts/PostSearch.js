import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startPostSearched } from "../../actions/postActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const PostSearch = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [chipInput, setChipInput] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    // dispatch(postClearActive());
    // setFormValues(initialState);
  };

  const handleAddChip = (chip) => {
    setChipInput([...chipInput, chip]);
  };

  const handleDeleteChip = (chipId) => {
    const data = chipInput.filter((chip) => chip !== chipId);
    setChipInput(data);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      console.log("Enter");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (chipInput.length > 4) {
      return Swal.fire(
        "Información",
        "Solamente puedes agregar 5 etiquetas #",
        "info"
      );
    }
    let tagsJoin = chipInput.join(",");

    dispatch(startPostSearched(searchInput, tagsJoin));
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<SearchIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        Buscar ...
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                // marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={1} sx={{ alignItems: "center" }}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      // style={{ margin: "10px 0" }}
                      fullWidth
                      label="Buscar por título"
                      onKeyUp={handleKeyUp}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ChipInput
                      // style={{ height: "56px" }}
                      margin="normal"
                      color="primary"
                      label="Buscar por etiquetas #"
                      variant="outlined"
                      fullWidth
                      // helperText={"Puedes agregar hasta 4 etiquetas"}
                      value={chipInput}
                      onAdd={(chip) => handleAddChip(chip)}
                      onDelete={(chip) => handleDeleteChip(chip)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      startIcon={<SearchIcon />}
                      type="submit"
                      fullWidth
                      variant="contained"
                      margin="normal"
                      // style={{ margin: "10px 0" }}
                      // sx={{ mt: 3, mb: 2 }}
                    >
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
