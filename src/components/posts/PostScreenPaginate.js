import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsPagination } from "../../actions/postActions";
import { Navbar } from "../ui/Navbar";

import { PostFormAdd } from "./PostFormAdd";
import { PostFormSearch } from "./PostFormSearch";
import { PostCard } from "./PostCard";
import { useLocation } from "react-router-dom";

import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { PostLoading } from "./PostLoading";
import { PostNotFound } from "./PostNotFound";

// var relativeTime = require("dayjs/plugin/relativeTime");
// dayjs.extend(relativeTime);

// dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
// dayjs.extend(localeData);

export const PostScreenPaginate = () => {
  const dispatch = useDispatch();
  const { posts, numberOfPages, currentPage } = useSelector(
    (state) => state.posts
  );
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const page = query.get("page") || 1;

  useEffect(() => {
    if (page) {
      setIsLoading(true);
      dispatch(getPostsPagination(page));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [dispatch, page]);

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 2, mb: 4 }} maxWidth="xl">
        <Grid marginTop={1} marginBottom={1} container align="center">
          <Grid item xs={12} sm={6} marginBottom={1}>
            <PostFormAdd />
          </Grid>
          <Grid item xs={12} sm={6} marginBottom={1}>
            <PostFormSearch />
          </Grid>
        </Grid>

        <Grid marginTop={1} marginBottom={2} container>
          <Grid item xs={12}>
            {numberOfPages && currentPage && (
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                count={numberOfPages}
                page={currentPage}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`posts${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            )}
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
