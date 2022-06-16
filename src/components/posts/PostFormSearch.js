import { Backdrop, Box, Button, Fade, Modal, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TagsInput } from "react-tag-input-component";

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
  boxShadow: 24,
  p: 4,
};

export const PostFormSearch = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [tag, setTag] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setSearchInput("");
    setTag([]);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      console.log("Enter");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tag.length > 4) {
      return Swal.fire(
        "Información",
        "Solamente puedes agregar 5 etiquetas #",
        "info"
      );
    }
    let tagsJoin = tag.join(",");

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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  style={{ marginBottom: "10px" }}
                  color="primary"
                  // margin="normal"
                  fullWidth
                  label="Título"
                  value={searchInput}
                  onKeyUp={handleKeyUp}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <div style={{ width: "100%" }}>
                  <TagsInput
                    style={{ width: "100%" }}
                    value={tag}
                    onChange={setTag}
                    name="tag"
                    placeHolder="Etiquetas"
                  />
                  <span>
                    <small>
                      &nbsp; Presione enter para añadir una nueva etiqueta
                      &nbsp; &nbsp; &nbsp;
                    </small>
                  </span>
                </div>

                <Button
                  sx={{ marginTop: "10px" }}
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
