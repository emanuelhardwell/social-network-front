import { Grid, Tooltip } from "@mui/material";
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
import { DeleteButton } from "./DeleteButton";
import { UpdateBotton } from "./UpdateBotton";
import { useSelector } from "react-redux";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

dayjs.locale("es", es); //AQUI PROBABLEMENTE HAYA UN PROBLEMA *****
dayjs.extend(localeData);

export const PostCard = ({ post }) => {
  const { uid } = useSelector((state) => state.auth);

  return (
    <Grid key={post?._id} item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }} elevation={6}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post?.user?.name && (post?.user?.name).charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post?.user?.name && capitalizeFirstLetter(post?.user?.name)}
          subheader={dayjs(post?.createdAtDate).fromNow()}
        />
        <CardMedia
          component="img"
          height="194"
          image={post?.imageUrl}
          alt={post?.title}
        />
        <CardContent>
          <Typography marginBottom={2} variant="body1" color="text.primary">
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
  );
};
