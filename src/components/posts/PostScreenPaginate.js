import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsPagination } from "../../actions/postActions";
import { Navbar } from "../ui/Navbar";

import Typography from "@mui/material/Typography";
import { PostFormAdd } from "./PostFormAdd";
import { PostFormSearch } from "./PostFormSearch";
import { LoadingRoller } from "../loaders/LoadingRoller";
import { PostCard } from "./PostCard";
import { useHistory } from "react-router-dom";

import Pagination from "@mui/material/Pagination";

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
  const history = useHistory();

  const useQuery = () => {
    // return new URLSearchParams(useLocation().search);
    return new URLSearchParams(history.location.search);
  };

  const query = useQuery();
  const page = query.get("page") || 1;

  const handlePageChange = (event, value) => {
    // setPage(value);
    // console.log(value);
    dispatch(getPostsPagination(value));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPostsPagination(page));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch, page]);

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

        <Grid container spacing={3} margin={3}>
          <Grid item xs={12}>
            <Pagination
              count={numberOfPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Grid>
      </Container>
    </div>
  );
};
