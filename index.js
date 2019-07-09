const express = require("express");

const postsRouter = require("./posts-router.js/index.js");

const server = express();


server.get("/", (req,res) => {
    res.send(`
        <h1>HELLO</h1>
    `)
})

server.use("/api/posts", postsRouter)



server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });