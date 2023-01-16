const express = require("express")
const postRouter = express.Router()

const {postModel} = require("../models/post.model")


postRouter.get("/", async (req, res) => {
    try {
        const data = await postModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

postRouter.post("/addpost", async (req, res) => {
    const payload = req.body
    try {
        const data = new postModel(payload)
        await data.save();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const data = await postModel.findOne({ "_id": id })
    const id_in_data = data.userID;
    const id_making_req = req.body.userID;

    try {
        if (id_in_data == id_making_req) {
            await postModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Updated")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const data = await postModel.findOne({ "_id": id })
    const id_in_data = data.userID;
    const id_making_req = req.body.userID;

    try {
        if (id_in_data == id_making_req) {
            await postModel.findByIdAndDelete({ "_id": id })
            res.send("Deleted")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = { 
    postRouter 
}

