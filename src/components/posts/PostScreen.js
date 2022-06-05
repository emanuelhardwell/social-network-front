import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Navbar } from "../ui/Navbar";

// card

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import { es } from "dayjs/locale/es";
import localeData from "dayjs/plugin/localeData";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { LikeButton } from "./LikeButton";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

export const PostScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post?._id} item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }} elevation={6}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {(post?.user?.name).charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={capitalizeFirstLetter(post?.user?.name)}
                  subheader={dayjs(post?.createdAtDate).fromNow()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={post?.imageUrl}
                  alt={post?.title}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post?.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <LikeButton likes={post.likes} idPost={post._id} />

                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
