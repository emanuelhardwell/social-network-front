import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
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
import { PostLoading } from "./PostLoading";
import { PostNotFound } from "./PostNotFound";
import { styled } from "@mui/material/styles";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

const ImageSection = styled("div")(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const CardSection = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));

const RecommendedPosts = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

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

      <Container sx={{ mt: 2, mb: 4 }} maxWidth="xl">
        {isLoading && <PostLoading />}

        {posts.length < 1 && <PostNotFound />}

        {posts.map((post) => (
          <Paper
            key={post._id}
            style={{ padding: "20px", borderRadius: "15px" }}
            elevation={6}
          >
            <CardSection>
              <div sx={{ borderRadius: "20px", margin: "10px", flex: 1 }}>
                <Typography variant="h3" component="h2">
                  {post?.title}
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  color="textSeconday"
                  gutterBottom
                >
                  {post?.tags.map((tag) => (
                    <Typography
                      color="primary"
                      variant="text"
                      fontSize={14}
                      key={tag}
                    >
                      #{tag}{" "}
                    </Typography>
                  ))}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="textSeconday"
                  gutterBottom
                >
                  {post?.description}
                </Typography>
                <Typography variant="h6"> {post?.user?.name} </Typography>
                <Typography variant="body1">
                  {dayjs(post?.createdAtDate).fromNow()}
                </Typography>

                <Divider style={{ margin: "20px 0" }} />
                <Typography variant="body1">
                  <strong> Realtime chat - Coming soon!! </strong>
                </Typography>

                <Divider style={{ margin: "20px 0" }} />
                <Typography variant="body1">
                  <strong> Comments - Coming soon!! </strong>
                </Typography>

                <Divider style={{ margin: "20px 0" }} />
              </div>

              <ImageSection>
                <CardMedia
                  component="img"
                  sx={{
                    borderRadius: "20px",
                    objectFit: "cover",
                    with: "100%",
                    maxHeight: "600px",
                  }}
                  src={post?.imageUrl}
                  alt={post.title}
                />
              </ImageSection>
            </CardSection>

            <RecommendedPosts>
              <Typography component="h5">Publicaciones recomendadas</Typography>
            </RecommendedPosts>
          </Paper>
        ))}
      </Container>

      {/* <Container sx={{ mt: 2, mb: 4 }}>
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
      </Container> */}
    </>
  );
};
