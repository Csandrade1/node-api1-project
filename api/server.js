// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const Users = require("./users/model");

server.use(express.json());

// | POST   | /api/users
server.post("/api/users", (req, res) => {
  Users.insert(req.body)

    .then((result) => {
      if (!req.body.name || req.body.bio == null) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        res.status(201).json(result);
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

// | GET    | /api/users
server.get("/api/users", (req, res) => {
  Users.find()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});
// | GET    | /api/users/:id
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((result) => {
      if (result == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

// | DELETE | /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((result) => {
      if (result == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(result);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});
// | PUT    | /api/users/:id
server.put("/api/users/:id", (req, res) => {
  Users.update(req.params.id, req.body)
    .then((result) => {
      if (!req.body.name || req.body.bio == null) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else if (result == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
