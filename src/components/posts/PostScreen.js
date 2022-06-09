import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";
import { Navbar } from "../ui/Navbar";

import { PostFormAdd } from "./PostFormAdd";
import { PostFormSearch } from "./PostFormSearch";
import { PostCard } from "./PostCard";
import { PostLoading } from "./PostLoading";
import { PostNotFound } from "./PostNotFound";

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
            <PostFormAdd />
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={1}>
            <PostFormSearch />
          </Grid>
        </Grid>

        {isLoading && <PostLoading />}

        {posts.length < 1 && <PostNotFound />}

        <Grid container spacing={3}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};
