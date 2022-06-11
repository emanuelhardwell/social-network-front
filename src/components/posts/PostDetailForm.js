import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export const PostDetailForm = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim().length < 4) {
      return Swal.fire("Info", "Asegurate de escribir un comentario", "info");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            // margin="normal"
            required
            fullWidth
            multiline
            rows={2}
            label="Comentario"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 4 }}
          >
            Comentar
          </Button>
        </Box>
      </Box>
    </>
  );
};
