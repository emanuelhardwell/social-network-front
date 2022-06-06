import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { startModalClose, startModalOpen } from "../../actions/modalActions";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import { startPostAdded } from "../../actions/postActions";

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

const Input = styled("input")({
  display: "none",
});

const initialState = {
  title: "",
  description: "",
  tags: "",
};

export const PostForm = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.modal);
  const [formValues, setFormValues] = useState(initialState);
  const [image, setImage] = useState("");

  const { title, description, tags } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      tags.trim() === ""
    ) {
      return Swal.fire("Error", "Ingrese todos los datos", "error");
    }

    if (image === "") {
      return Swal.fire("Error", "Agrege una imagen", "error");
    }

    dispatch(startPostAdded(formData));
    dispatch(startModalClose());
    setFormValues(initialState);
    setImage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      //   dispatch(startUploading(file));
      setImage(file);
    }
  };

  const handleOpen = () => dispatch(startModalOpen());
  const handleClose = () => dispatch(startModalClose());

  return (
    <>
      <Grid marginTop={1} marginBottom={2} container>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpen}>
            {" "}
            Agregar post{" "}
          </Button>
        </Grid>
      </Grid>

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
              <Typography component="h1" variant="h5">
                Crear post
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                // sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Titulo"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={2}
                  label="Descripción"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Tags"
                  name="tags"
                  value={tags}
                  onChange={handleInputChange}
                />

                <Stack
                  marginTop={1}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      //   multiple
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    />
                    <Button
                      color="success"
                      variant="contained"
                      component="span"
                    >
                      Elegir imagen
                    </Button>
                  </label>
                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton
                      color="success"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
