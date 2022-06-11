import {
  Avatar,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { Navbar } from "../ui/Navbar";


import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../actions/postActions";
import { useHistory, useParams } from "react-router-dom";
import { PostLoading } from "./PostLoading";
import { PostNotFound } from "./PostNotFound";
import { styled } from "@mui/material/styles";
import { Return } from "./Return";
import { red } from "@mui/material/colors";
import { PostDetailComment } from "./PostDetailComment";
import { PostDetailForm } from "./PostDetailForm";

// dayjs
import dayjs, { localeData } from "dayjs";
import es from "dayjs/locale/es";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

export const ImageSection = styled("div")(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

export const CardSection = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));

export const RecommendedPosts = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const PostDetail = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleClickBackHistory = () => {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push("/posts");
    }
  };

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

        {!post && <PostNotFound />}

        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} padding="20px">
              <div>
                <Typography component="h2" variant="h5" gutterBottom>
                  <strong>{capitalizeFirstLetter(post?.title)}</strong>
                </Typography>
                <Typography component="h3" variant="subtitle1" gutterBottom>
                  {capitalizeFirstLetter(post?.description)}
                </Typography>
                <Typography component="h2" variant="body1" gutterBottom>
                  {post?.tags.map((tag) => (
                    <Typography
                      color="primary"
                      variant="text"
                      fontWeight="bold"
                      fontSize={14}
                      key={tag}
                    >
                      {" "}
                      #{tag}{" "}
                    </Typography>
                  ))}
                </Typography>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="nombre">
                    {post?.user?.name &&
                      (post?.user?.name).charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    component="h2"
                    variant="body1"
                    fontWeight="bold"
                    marginLeft="10px"
                    // gutterBottom
                  >
                    {post?.user?.name &&
                      capitalizeFirstLetter(post?.user?.name)}{" "}
                    {post?.user?.lastname &&
                      capitalizeFirstLetter(post?.user?.lastname)}
                  </Typography>
                </div>

                <Typography component="h2" variant="body2" gutterBottom>
                  {dayjs(post?.createdAtDate).fromNow()}
                </Typography>
                {/* <LikeButton likes={post?.likes} idPost={post?._id} /> */}
                <Divider sx={{ m: "10px 0" }} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} padding="20px">
              <CardMedia
                sx={{
                  objectFit: "contain",
                  borderRadius: "20px",
                  maxHeight: "500px",
                }}
                component="img"
                image={post?.imageUrl}
                alt={post?.title}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6} md={6} padding="20px">
              <PostDetailForm postId={post?._id} />
              <PostDetailComment post={post} />
            </Grid>
          </Grid>
        </Paper>

        <Return handleClickBackHistory={handleClickBackHistory} />
      </Container>
    </>
  );
};
