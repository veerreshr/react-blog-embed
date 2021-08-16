import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IconButton, Link } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  expand: {
    marginLeft: "auto",
  },
  cardAction: {
    marginTop: "auto",
  },
});

export default function ArticleCard({
  thumbnail,
  title,
  tags,
  likes = 0,
  comments = 0,
  date,
  url,
  isMedium = false,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link href={url}>
          <CardMedia
            component="img"
            alt={title}
            height="150"
            image={thumbnail}
            title={title}
          />
        </Link>
        <CardContent>
          <Link href={url}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
          </Link>
          {isMedium && (
            <Typography variant="body2" color="textSecondary" component="p">
              {date}
            </Typography>
          )}
          {!isMedium && (
            <Typography variant="body2" color="textSecondary" component="p">
              {tags.map((t) => "#" + t + " ")}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {!isMedium && (
        <CardActions disableSpacing className={classes.cardAction}>
          <IconButton aria-label="likes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="grey"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
            </svg>
          </IconButton>
          <Typography component="p" variant="body2" color="textSecondary">
            {likes}
          </Typography>
          <IconButton aria-label="comments">
            <svg
              fill="grey"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10Z" />
            </svg>
          </IconButton>
          <Typography component="p" variant="body2" color="textSecondary">
            {comments}
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
            className={classes.expand}
          >
            {date}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
}
