const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "public");
const dbPath = path.join(__dirname, "..", "..", "db", "db.json");

router
  .route("/notes")
  .get((req, res) => {
    fs.readFile(dbPath, (err, data) => {
      if (err) {
        return res.status(500).send("Server Error! :(");
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  })
  .post((req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).send("Please enter a title and body >:(");
    }

    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Server Error! :(");
      }

      const notes = JSON.parse(data);
      const newNote = { title, text, id: uuid.v4() };
      notes.push(newNote);

      fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
        if (err) {
          return res.status(500).send("Server Error! :(");
        }

        res.json({
          status: "Success!",
          body: newNote,
        });
      });
    });
  });

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(dbPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error! :(");
    }

    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== id);

    if (updatedNotes.length === notes.length) {
      return res.status(404).send("No note found :(");
    }

    fs.writeFile(dbPath, JSON.stringify(updatedNotes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server Error! :(");
      }

      res.status(200).send("Deleted! :)");
    });
  });
});

module.exports = router;
