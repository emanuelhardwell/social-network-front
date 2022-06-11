import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import {
  startPostCommentDeleted,
  startPostDeleted,
} from "../../actions/postActions";
import Swal from "sweetalert2";

export const DeleteButton = ({ id, idComment, question, isPost }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: question,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    });

    if (result.isConfirmed) {
      if (isPost) {
        dispatch(startPostDeleted(id));
      } else {
        dispatch(startPostCommentDeleted(id, idComment));
      }
    }
  };

  return (
    <>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => handleDelete(id)}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};
