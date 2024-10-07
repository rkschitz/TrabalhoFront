const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");

const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const BreedRouter = require("./src/routes/breed");
const authMiddleware = require("./src/middleware/auth");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

app.use("/api/v1/user", authMiddleware(["admin"]), UserRouter);
app.use("/api/v1/breed", BreedRouter)

database.db
  .sync({ force: false })
  .then((_) => {
    if (!process.env.TEST) {
      app.listen(3000, (_) => {
        console.log("Server running on port 3000");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados ${e}`);
  });

module.exports = app;