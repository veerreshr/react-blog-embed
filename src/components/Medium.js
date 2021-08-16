import { Grid, Link } from "@material-ui/core";
import React, { useState } from "react";
import { Typography } from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

function Medium({ username }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = (user) => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${user}`
    )
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        data.forEach((d) => {
          let tempData = {};
          tempData["thumbnail"] = d.thumbnail;
          tempData["title"] = d.title;
          tempData["tags"] = d.categories;
          tempData["date"] = d.pubDate.split(" ")[0];
          tempData["url"] = d.link;
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
          src="https://res.cloudinary.com/dcgefz04y/image/upload/v1629066937/Medium-removebg-preview_mcolsw.png"
          alt="Medium brand logo"
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
                date={d.date}
                url={d.url}
                isMedium={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Medium;
