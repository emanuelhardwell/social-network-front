import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { postSetActive } from "../../actions/postActions";

export const UpdateBotton = ({ post }) => {
  const dispatch = useDispatch();

  const handleUpdated = async (post) => {
    const result = await Swal.fire({
      title: "¿Está seguro de editar este post?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, editalo!",
    });

    if (result.isConfirmed) {
      dispatch(postSetActive(post));
    }
  };

  return (
    <>
      <Tooltip title="Editar">
        <IconButton
          sx={{ marginLeft: "auto" }}
          onClick={() => handleUpdated(post)}
        >
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
    </>
  );
};