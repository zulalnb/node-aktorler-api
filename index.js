const express = require("express");
const actorsRouter = require("./routers/actorsRouter");

const server = express();
server.use(express.json());
server.use("/actors", actorsRouter);

server.get("/", (req, res) => {
  res.send("Hi from Express");
});

server.listen(5000, () => {
  console.log("listening requests come from http://localhost:5000 address...");
});
