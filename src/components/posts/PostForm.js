import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { startModalClose, startModalOpen } from "../../actions/modalActions";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import {
  postClearActive,
  startPostAdded,
  startPostUpdated,
} from "../../actions/postActions";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  const { postActive } = useSelector((state) => state.posts);
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

    if (postActive) {
      dispatch(startPostUpdated(formData, postActive._id));
      dispatch(startModalClose());
      setFormValues(initialState);
      setImage("");
    } else {
      dispatch(startPostAdded(formData));
      dispatch(startModalClose());
      setFormValues(initialState);
      setImage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleOpen = () => dispatch(startModalOpen());
  const handleClose = () => {
    dispatch(startModalClose());
    dispatch(postClearActive());
    setFormValues(initialState);
  };

  useEffect(() => {
    if (postActive) {
      dispatch(startModalOpen());
      setFormValues({
        title: postActive.title,
        description: postActive.description,
        tags: postActive.tags.join(),
      });
    } else {
      setFormValues(initialState);
    }
  }, [dispatch, postActive]);

  return (
    <>
      <Button
        startIcon={<AddCircleOutlineIcon />}
        variant="contained"
        onClick={handleOpen}
      >
        Crear publicación
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
              <Typography component="h1" variant="h5">
                {postActive ? "Editar publicación" : "Crear publicación"}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
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
