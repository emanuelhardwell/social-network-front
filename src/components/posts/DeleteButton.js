import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { startPostDeleted } from "../../actions/postActions";
import Swal from "sweetalert2";

export const DeleteButton = ({ idPost }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este post?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    });

    if (result.isConfirmed) {
      dispatch(startPostDeleted(id));
    }
  };

  return (
    <>
      <Tooltip title="Eliminar">
        <IconButton
          sx={{ marginLeft: "auto" }}
          onClick={() => handleDelete(idPost)}
        >
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};
