import axios from "axios";
import express from "express";
const app = express();
const port = 8000;

app.get("/qm-modules-legacy", async (req, res) => {
  const modules = [];
  const response = await axios.get(
    "https://api.github.com/users/modulesQuimera/repos?per_page=10000"
  );
  response.data.forEach((repo) => {
    if (repo.name.startsWith("qm-") || repo.name.startsWith("qmb-")) {
      modules.push(repo.name);
    }
  });
  res.send({ modules: modules, total: modules.length });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
