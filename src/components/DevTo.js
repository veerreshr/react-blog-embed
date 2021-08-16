import { Grid, Link } from "@material-ui/core";
import React, { useState } from "react";
import { Typography } from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

function DevTo({ username }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = (user) => {
    fetch(`https://dev.to/api/articles?username=${user}`)
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        data.forEach((d) => {
          let tempData = {};
          tempData["thumbnail"] = d.cover_image;
          tempData["title"] = d.title;
          tempData["tags"] = d.tag_list;
          tempData["likes"] = d.public_reactions_count;
          tempData["comments"] = d.comments_count;
          tempData["date"] = d.readable_publish_date;
          tempData["url"] = d.url;
          newData.push(tempData);
        });
        setLoading(false);
        setData(newData);
      });
  };
  useEffect(() => {
    getData(username);
  }, [username]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "no-wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1em 0.5em 1em 0.5em",
        }}
      >
        <img
          style={{ height: "3em" }}
          src="https://res.cloudinary.com/dcgefz04y/image/upload/v1629066716/dev-black_zjlh4h.png"
          alt="dev.to brand logo"
        />
        <Link href={`http://dev.to/${username}`}>
          <Typography component="p" variant="body1" color="textSecondary">
            /@{username}
          </Typography>
        </Link>
      </div>
      {loading ? (
        <LinearProgress style={{ margin: "1em" }} />
      ) : (
        <Grid container spacing={3}>
          {data.map((d) => (
            <Grid item xs={12} md={4} lg={3}>
              <ArticleCard
                thumbnail={d.thumbnail}
                title={d.title}
                tags={d.tags}
                likes={d.likes}
                comments={d.comments}
                date={d.date}
                url={d.url}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default DevTo;
