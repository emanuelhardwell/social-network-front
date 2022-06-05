import React from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";

export const LikeButton = ({ likes }) => {
  const { uid } = useSelector((state) => state.auth);
  //   const { posts } = useSelector((state) => state.posts);

  const verifyLike = () => {
    const index = likes?.findIndex((id) => id === uid);

    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <IconButton aria-label="add to favorites">
        {verifyLike() ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
        {""}
        {console.log(verifyLike())}
      </IconButton>

      <span> {likes.length > 0 ? likes.length : ""}</span>
    </>
  );
};
