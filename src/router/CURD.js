import express from "express";
import Chats from "../database/database.js";

const router = new express.Router();

// Handeling CURD operation.
router.get("/", (req, res) => {
    res.send("<h2>These are some routes</h2>");
})

// When we are working with database methods, make sure use async and await
router.get("/chats", async (req, res) => {
    try {

        let { sort, select, username } = req.query;
        // console.log(req.query);

        let result = Chats.find();
        // console.log(result);
        if(username){
            username = username.split(",");
            result.find({ username: { $in: username } });
        }

        if (sort) {
            sort = sort.split(",").join(" ");
            result.sort(sort);
        }

        if (select) {
            select = select.split(",").join(" ");
            result.select(select);
        }

        result = await result;
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error :(");
    }

})


// For fetching by username
router.get("/chats/:username", async (req, res) => {
    const username = req.params.username;
    // console.log(username);

    try {
        // Making search case insensitive.
        const result = await Chats.find({ username: { $regex: username, $options: "i" } });

        if (result.length)
            res.status(200).json(result);
        else
            res.status(404).send("No Data Found");

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})



// Update document
router.patch("/chats/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        // console.log(req.body);
        const result = await Chats.updateOne({ _id }, { $set: req.body });
        res.status(200).json(result);

    } catch (err) {
        res.status(500).send(err);
        // console.log(err);
    }
})



// Create document
router.post("/chats", async (req, res) => {
    try {
        const content = req.body;
        const result = await Chats.insertMany([content]);

        res.status(201).json(result);
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }

})



// Delete document
router.delete("/chats/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Chats.deleteOne({ _id });
        // console.log(result);

        res.status(200).send(`document id: ${_id} is deleted`);
    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
})



export default router;