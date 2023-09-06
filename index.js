const express = require("express");
let data = require("./data.js");

const server = express();

server.get("/", (req, res) => {
  res.send("Hi from Express");
});

server.get("/actors", (req, res) => {
  res.status(200).json(data);
});

server.get("/actors/:id", (req, res) => {
    const { id } = req.params;
    const actor = data.find((actor) => actor.id === parseInt(id));
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json("Actor not found.");
    }
  });

server.listen(5000, () => {
  console.log("listening requests come from http://localhost:5000 address...");
});
