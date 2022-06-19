const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize('pra', 'seth.king', 'Poiop90lik8', {
    host: 'localhost',
    dialect: 'postgres'
})

const Post = conn.define('post', {
    title: {
        type: STRING
    },
    body: {
        type: STRING
    }
})

const syncAndSeed = async() =>{
    await conn.sync({ force: true})
    await Promise.all([
        Post.create({
            title: 'the beginnig',
            body: 'hellohejeeleo'
        }),
        Post.create({
            title: 'another post',
            body: 'hellohejeeleo'
        }).then(()=>{
            console.log('sycned data')
        })
    ])
}

module.exports = {
    syncAndSeed,
    Post,
    conn
}