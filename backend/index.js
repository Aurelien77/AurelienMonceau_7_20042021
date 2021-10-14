const express = require("express");
const app = express();
const postRouter = require("./routes/Posts");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models"); // Pour injecter le modèle dans la BD

app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
