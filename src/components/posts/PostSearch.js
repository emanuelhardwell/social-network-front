import { Box, Button, Grid, TextField } from "@mui/material";
import ChipInput from "material-ui-chip-input";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startPostSearched } from "../../actions/postActions";

export const PostSearch = () => {
  const dispatch = useDispatch();

  const [chipInput, setChipInput] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
  };

  return (
    <>
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
            <Grid item xs={12} sm={5}>
              <TextField
                // margin="normal"
                style={{ margin: "10px 0" }}
                fullWidth
                label="Buscar por título"
                onKeyUp={handleKeyUp}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <ChipInput
                style={{ margin: "10px 0" }}
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

            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                margin="normal"
                style={{ margin: "10px 0" }}
                // sx={{ mt: 3, mb: 2 }}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
