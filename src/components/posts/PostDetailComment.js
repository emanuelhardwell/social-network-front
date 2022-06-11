import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import dayjs from "dayjs";
import React from "react";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

export const PostDetailComment = ({ post }) => {
  return (
    <>
      <Typography variant="h6" component="h3">
        Comentarios
      </Typography>
      <Divider sx={{ m: "10px 0" }} />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {post?.comments.map((comment) => (
          <div key={comment?._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                <Avatar sx={{ bgcolor: teal[500] }} alt="foto">
                  {" "}
                  {comment?.user?.name &&
                    (comment?.user?.name).charAt(0).toUpperCase()}{" "}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${
                  comment?.user?.name &&
                  capitalizeFirstLetter(comment?.user?.name)
                }  ${
                  comment?.user?.lastname &&
                  capitalizeFirstLetter(comment?.user?.lastname)
                }`}
                secondary={
                  <>
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment?.comment}{" "}
                      </Typography>
                    </>
                    <>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        fontSize="13px"
                      >
                        {"----- "}
                        {dayjs(comment?.createdAt).fromNow()}
                      </Typography>
                    </>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </>
  );
};
