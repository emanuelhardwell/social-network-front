import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { Navbar } from "../ui/Navbar";
import { DeleteButton } from "./DeleteButton";
import { LikeButton } from "./LikeButton";
import { UpdateBotton } from "./UpdateBotton";

import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs, { localeData } from "dayjs";
import es from "dayjs/locale/es";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../actions/postActions";
import { useParams } from "react-router-dom";
import { LoadingRoller } from "../loaders/LoadingRoller";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

export const PostDetail = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params && params.id) {
      setIsLoading(true);
      dispatch(getPostById(params.id));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [params, dispatch]);

  return (
    <>
      <Navbar />

      {isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LoadingRoller />
          </Grid>
        </Grid>
      )}

      <Container sx={{ mt: 2, mb: 4 }}>
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
                  <Tooltip title="Compartir">
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>

                  {post?.user?._id === uid && (
                    <div style={{ marginLeft: "auto" }}>
                      <DeleteButton idPost={post._id} />
                      <UpdateBotton post={post} />
                    </div>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
