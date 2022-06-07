import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Navbar } from "../ui/Navbar";

import Typography from "@mui/material/Typography";
import { PostForm } from "./PostForm";
import { PostSearch } from "./PostSearch";
import { LoadingRoller } from "../loaders/LoadingRoller";
import { PostCard } from "./PostCard";

// var relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);

// dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
// dayjs.extend(localeData);

export const PostScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
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
            <PostCard key={post._id} post={post} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};
