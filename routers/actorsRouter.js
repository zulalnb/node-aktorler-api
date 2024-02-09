const router = require("express").Router();
let data = require("../data.js");
const Actor = require("../data/data-model");

router.get("/", (req, res, next) => {
  Actor.findActor()
    .then((actors) => {
      res.status(200).json(actors);
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bad things happened when fetching actors",
        error,
      });
    });
});

router.post("/", (req, res, next) => {
  const newActor = req.body;

  if (!newActor.name) {
    next({
      statusCode: 400,
      errorMessage: "You should enter name to add actor.",
    });
  } else {
    Actor.addActor(newActor)
      .then((added) => {
        res.status(201).json(added);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Bad things happened when entering actor.",
          error,
        });
      });
  }
});

// put ve patch update yapar. farkları

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedActor = req.body;

  if (!updatedActor.name) {
    next({
      statusCode: 400,
      errorMessage: "Actor name can not be empty",
    });
  } else {
    Actor.updateActor(updatedActor, id)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((error) => {
        next({
          statusCode: 500,
          errorMessage: "Bad things happened when updating actor",
          error,
        });
      });
  }
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Actor.findActorById(id)
    .then((deletedActor) => {
      Actor.deleteActor(id)
        .then((deleted) => {
          if (deleted) {
            res.status(204).end();
          }
          next({
            statusCode: 400,
            errorMessage: "The actor you want to delete is not exists.",
          });
        })
        .catch((error) => {
          next({
            statusCode: 500,
            errorMessage: "Bad things happened when deleted actor",
            error,
          });
        });
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bad things happened when finding actor",
      });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Actor.findActorById(id)
    .then((actor) => {
      if (actor) {
        res.status(200).json(actor);
      } else {
        next({
          statusCode: 400,
          errorMessage: "The actor you want to find is not exists.",
        });
      }
    })
    .catch((error) => {
      next({
        statusCode: 500,
        errorMessage: "Bad things happened when finding actor",
        error,
      });
    });
});

module.exports = router;
