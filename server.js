const express = require('express')
const app = express()
const PORT = 3100
const db = require('./db/database')
const bodyParser = require('body-parser')
const { syncAndSeed, Post } = db
app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})

app.use(bodyParser.json())
//get all post data
app.get('/api/posts', async(req, res)=>{
   res.send(await Post.findAll())
})

app.post('/api/posts', async(req, res)=>{
  // res.send(await Post.create(req.body))
  res.send(await Post.create(req.body))
})

app.delete('/api/posts/:id', async(req, res)=>{
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id)
    await post.destroy()
    res.sendStatus(200)
  }
  catch(err){
    console.log(err)
  }
})

const start = async() =>{
  await syncAndSeed()
}

start()
