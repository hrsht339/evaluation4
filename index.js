const express = require("express")
const cors = require("cors")
const {connection} = require("./configs/db")
const {authenticate} = require("./middlewares/authentication")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")


const app = express()
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(4500,async()=>{
    try{
        await connection 
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("server is up at 4500")
})