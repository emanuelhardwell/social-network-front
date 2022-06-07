import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import ChipInput from "material-ui-chip-input";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startPostSearched } from "../../actions/postActions";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const PostSearch = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const [chipInput, setChipInput] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setSearchInput("");
    setChipInput([]);
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
    history.push(`/post/search?searchQuery=${searchInput}&tags=${tagsJoin}`);
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Buscar por título"
                  value={searchInput}
                  onKeyUp={handleKeyUp}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <ChipInput
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

                <Button
                  startIcon={<SearchIcon />}
                  type="submit"
                  fullWidth
                  variant="contained"
                  margin="normal"
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
