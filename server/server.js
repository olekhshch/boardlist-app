import Express, { json, urlencoded } from "express";
import { writeFileSync, readFileSync, writeFile } from "fs";

const app = new Express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.listen(5000, () => console.log("My server started on port 5000"));

app.get("/items", (req, res) => {
  const data = JSON.parse(readFileSync("./db/items.json"));
  res.json(data);
});

app.get("/groups", (req, res) => {
  const data = JSON.parse(readFileSync("./db/groups.json"));
  res.json(data);
});

app.get("/boards", (req, res) => {
  const data = JSON.parse(readFileSync("./db/boards.json"));
  res.json(data);
});

app.get("/statuses", (req, res) => {
  const data = JSON.parse(readFileSync("./db/statuses.json"));
  res.json(data);
});

app.post("/items", (req, res) => {
  const newJson = JSON.stringify(req.body, null, 2);
  writeFileSync("./db/items.json", newJson);
});

app.post("/groups", (req, res) => {
  const newJson = JSON.stringify(req.body, null, 2);
  writeFileSync("./db/groups.json", newJson);
});

app.post("/boards", (req, res) => {
  const newJson = JSON.stringify(req.body, null, 2);
  writeFileSync("./db/boards.json", newJson);
});

app.post("/statuses", (req, res) => {
  const newJson = JSON.stringify(req.body, null, 2);
  writeFileSync("./db/statuses.json", newJson);
});
