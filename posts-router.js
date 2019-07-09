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
    const postInfo = req.body

    if (postInfo.title && postInfo.contents){
    db
    .insert(postInfo)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    } else {
        res.status(404).json({ errorMessage: "Please provide title and contents for the post." }
        )}
})

router.get("/:id", (req,res) => {
    const id = req.params.id

    if(id){
    db
    .findById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

router.get("/:id/comments", (req, res) => {
    const id = req.params.id

    if(id){
    db
    .findPostComments(id)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})

//HELP

router.post("/:id/comments", (req, res) => {
    const commentInfo = req.body.text

    const id = req.params.id

    const comment = {
        post_id: id,
        text: commentInfo
    }

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
        if(isValidComment(comment)){
            db
            .insertComment(comment)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
    }
})

function isValidComment(comment) {
    const { text } = comment;
    return text
}

router.delete("/:id", (req,res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else {
            res.status(404).json( { message: "The post with the specified ID does not exist." } )
        }
    })
    .catch(error => {
        res.status(500).json( { error: "This post could not be removed" } )
     })
})

module.exports = router;