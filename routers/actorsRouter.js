const router = require("express").Router();
let data = require("../data.js");

router.get("/", (req, res) => {
  res.status(200).json(data);
});

let next_id = 4;

router.post("/", (req, res, next) => {
  let new_actor = req.body;

  if (!new_actor.name) {
    next({
      statusCode: 400,
      errorMessage: "You should enter name to add actor.",
    });
  } else if (new_actor.name && !new_actor.movies) {
    next({
      statusCode: 400,
      errorMessage: "You should enter movies to add actor.",
    });
  } else {
    new_actor.id = next_id;
    next_id++;
    data.push(new_actor);
    res.status(201).json(new_actor);
  }
});

router.delete("/:id", (req, res) => {
  const actor_id_to_del = req.params.id;
  const actor_to_del = data.find(
    (actor) => actor.id === Number(actor_id_to_del)
  );

  if (actor_to_del) {
    data = data.filter((actor) => actor.id !== Number(actor_id_to_del));
    res.status(204).end();
  } else {
    res.status(404).json({ errorMessage: "No actor was found." });
  }
});

router.put("/:id", (req, res) => {
  let new_actor = req.body;
  const actor_id_to_update = req.params.id;
  const actor_to_update = data.find(
    (actor) => actor.id === Number(actor_id_to_update)
  );

  if (actor_to_update) {
    data = data.map((actor) =>
      actor.id === Number(actor_id_to_update)
        ? { ...actor, ...new_actor }
        : actor
    );
    res.status(200).json(data);
  } else {
    res.status(404).json({ errorMessage: "Actor was not found." });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const actor = data.find((actor) => actor.id === parseInt(id));
  if (actor) {
    res.status(200).json(actor);
  } else {
    res.status(404).json({ errorMessage: "Actor was not found." });
  }
});

module.exports = router;
