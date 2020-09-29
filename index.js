const express = require("express");
const auth = require("basic-auth");
const app = express();
const port = 8080;

app.use((req, res, next) => {
  console.log("headers:", req.headers);
  let a = auth(req);
  console.log("auth:", a);

  if (a) {
    const { name, pass } = auth(req);

    if (name === "ricklee" && pass === "123456") {
      res.status(200);
      res.end();
    }
  }
  res.status(401);
  res.end("Unauthorized");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
