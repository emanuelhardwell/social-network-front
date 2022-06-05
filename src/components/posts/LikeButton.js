import React, { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import { startPostLiked } from "../../actions/postActions";

export const LikeButton = ({ likes, idPost }) => {
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisable] = useState(false);
  //   const { posts } = useSelector((state) => state.posts);

  const verifyLike = () => {
    const index = likes?.findIndex((id) => id === uid);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  const handleClickLike = (id) => {
    setButtonDisable(true);
    dispatch(startPostLiked(id));
    setTimeout(() => {
      setButtonDisable(false);
    }, 2000);
  };

  return (
    <>
      <IconButton
        disabled={buttonDisabled}
        aria-label="add to favorites"
        onClick={() => handleClickLike(idPost)}
      >
        {verifyLike() ? (
          <ThumbUpIcon color="primary" />
        ) : (
          <ThumbUpOutlinedIcon color="primary" />
        )}
        {""}
      </IconButton>

      <Typography component="span">
        {" "}
        {likes.length > 0 ? likes.length : ""}
      </Typography>
    </>
  );
};
