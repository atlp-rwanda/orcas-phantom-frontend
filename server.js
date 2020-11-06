const Express = require("express");
const { join } = require("path");
const app = Express();
require("dotenv").config();

app.use(Express.static(join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Phantom app up and running at port ${PORT}`);
});
