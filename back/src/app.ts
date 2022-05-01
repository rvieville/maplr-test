import bodyParser = require("body-parser");
import * as express from "express";

import playerRoute from "./routes/player.route";
import teamRoute from "./routes/team.route";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

app.use("/api/player", playerRoute);
app.use("/api/team", teamRoute);

app.listen(3000, () => {
  console.log("app listen port => ", 3000);
});
