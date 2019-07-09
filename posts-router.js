const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

router.use(express.json());


router.get("/", (req,res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error =>{
        res.status(500).json( { error: "The posts information could not be retrieved." } )
    })
})

router.post("/", (req,res) => {
    db
    .insert(post)
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;