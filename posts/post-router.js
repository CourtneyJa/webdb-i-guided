const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    console.log(posts);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ errorMessage: "failed to get posts" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await db("posts").where("id", id);
    res.json(post);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: "failed to get posts with specified id" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ errorMessage: "failed to add new with post" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsUpdated = await db("posts")
      .where({ id })
      .update(req.body);
    res.status(200).json({ updated: rowsUpdated });
  } catch (err) {
    res.status(500).json({ errorMessage: "failed to update the post" });
  }
});

router.delete("/:id", async (req, res) => {
    try{
        const rowsDeleted = await db('posts').where('id', req.params.id).del();
        res.json({deletedRecords: rowsDeleted})
    } catch (err){
        res.status(500).json({ errorMessage: "failed to remove the post" });   
    }
});

module.exports = router;
