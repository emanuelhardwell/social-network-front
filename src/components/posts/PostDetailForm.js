import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startPostCommented } from "../../actions/postActions";

export const PostDetailForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim().length < 4) {
      return Swal.fire(
        "Info",
        "Asegurate de escribir un comentario mayor a 3 caracteres",
        "info"
      );
    }
    dispatch(startPostCommented(postId, comment));
    setComment("");
  };

  return (
    <>
      <Box
        sx={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 600,
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
