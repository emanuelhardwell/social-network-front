import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { PostForm } from "./PostForm";
import { DeleteButton } from "./DeleteButton";
import { UpdateBotton } from "./UpdateBotton";
import { PostSearch } from "./PostSearch";
import { LoadingRoller } from "../loaders/LoadingRoller";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

export const PostScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const { uid } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPosts());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 2, mb: 4 }}>
        <Grid marginTop={1} marginBottom={1} container align="center">
          <Grid item xs={12} sm={6} marginBottom={1}>
            <PostForm />
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={1}>
            <PostSearch />
          </Grid>
        </Grid>

        {isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LoadingRoller />
            </Grid>
          </Grid>
        )}

        {!posts.length && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography textAlign="center" gutterBottom>
                No hay publicaciones
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post?._id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }} elevation={6}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {post?.user?.name &&
                        (post?.user?.name).charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    post?.user?.name && capitalizeFirstLetter(post?.user?.name)
                  }
                  subheader={dayjs(post?.createdAtDate).fromNow()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={post?.imageUrl}
                  alt={post?.title}
                />
                <CardContent>
                  <Typography
                    marginBottom={2}
                    variant="body1"
                    color="text.primary"
                  >
                    {post?.tags.map((tag) => (
                      <Typography
                        color="primary"
                        variant="text"
                        fontSize={13}
                        key={tag}
                      >
                        {" "}
                        #{tag}{" "}
                      </Typography>
                    ))}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {capitalizeFirstLetter(post?.title)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post?.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <LikeButton likes={post.likes} idPost={post._id} />

                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  {post?.user?._id === uid && (
                    <>
                      <DeleteButton idPost={post._id} />
                      <UpdateBotton post={post} />
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
