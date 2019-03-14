const express = require("express");
const server = express();
const db = require("../data/db"); // allows me to access methods in db.js
server.use(express.json());
server.get("/", (req, res) => {
    db.hubs
      .find()
      .then(hubs => res.status(200).json({ success: true, hubs }))
      .catch(({ code, message })=> res.status(code).json({ message }));
});
server.post("/", (req, res) => {
    const hub = req.body;
    db.hubs
      .addHub(hub)
      .then(newHub => res.status(201).json({ success: true, newHub }))
      .catch(({ code, message }) => res.status(code).json({ message }));
});
server.delete("/:id", (req, res) => {
    const id = req.parems.idd;
    db.hubs
      .remove(id)
      .then(hub => res.status(204).json(hub))
      .catch(({ code, message }) => res.status(code).json({ message }));
});
server.put("/:id", (req, res) => {
    const id = req.parems.id;
    db.hubs
      .update(id, differences)
      .then(updateHub => {
          updateHub
          ? res.status(200).json({ success: true, updatedHub })
          : res.status(404).json({ message: "could not find id"});
      })
      .catch(({ code, message }) => res.status(code).json({ message }));
});

module.exports = server;