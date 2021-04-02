import * as sapper from "@sapper/server";
import compression from "compression";
import express from "express";
import sirv from "sirv";

const dev = process.env.NODE_ENV === "development";

const app = express();

app.use(compression({ threshold: 0 }));
app.use(sirv("static", { dev }));
app.use(sapper.middleware());

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
