import 'dotenv/config';
import express, { query } from 'express';
import asyncHandler from 'express-async-handler';
import * as model from "./model.mjs"

const PORT = process.env.PORT;
const app = express();

app.use(express.json({extended:true}))

const validate_body = (body) =>{
    const keys = Object.keys(body)
    if(typeof body.title !== "string"){
        throw Error("Invalid title")
    }
    if(typeof body.body !== "string"){
        throw Error("Invalid body")
    } 
    if(!Number.isInteger(body.date)){
        console.log(body.date)
        throw Error("Invalid date")
    }
    // ignore type of tags array
}

/**
 * GET Request to retrieve entries
 */
app.get("/entries", asyncHandler(async (req,res) =>{
    const result = await model.get({
        // TODO filters
    },
    {
        offset: req.query.offset ? req.query.offset : 0,
        limit: req.query.limit ? req.query.limit : 100
    })

    // send response
    res.setHeader('content-type', 'application/json');
    res.status(200).send(result)
}))

app.get("/entries/total", asyncHandler(async(req,res)=>{
    const result = await model.countOfDocuments({
        // TODO filters
    })
    console.log(result)

    // send response
    res.setHeader('content-type', 'application/json');
    res.status(200).send(result)
}))

/**
 * POST Request to create a new entry
 */
app.post("/entries", asyncHandler(async (req,res)=>{

    res.setHeader('content-type', 'application/json');

    try{
        let requestbody = req.body

        validate_body(requestbody)
        console.log(requestbody)
        // create the entry
        let result = await model.create(requestbody)

        console.log(result)
        // return 201 and return the resulting entry
        res.status(201).send(result)
    }catch(error){
        console.log(error)
        res.status(400).send({Error: "Invalid request"})
    }

}))

/**
 * PUT Request to update an entry
 */
app.put("/entries", asyncHandler(async(req,res)=>{
    res.setHeader('content-type', 'application/json');

    try{
        // validate
        validate_body(req.body)

        // filter to find the exercise
        let filter = {_id: req.body._id}

        // make request to DB to update exercise
        await model.update(filter, req.body)

        // retrieve exercises to get the updated row
        let result = await model.get(filter)

        // return the result of change
        if(result.length > 0){
            res.status(200).send(result[0])   
        }
        
        // not found
        else{
            res.status(404).send({ Error: "Not found"})
        }


    }catch(e){
        res.status(400).send({ Error: "Invalid request"})
    }

}))

/**
 * DELETE Request to delete an entry
 */
app.delete("/entries/:_id", asyncHandler(async(req,res)=>{
    
    // generate filter based on query argument
    let filter = {
        _id: req.params._id
    }

    // delete exercises using filter
    let result = await model.deleteEntry(filter)

    // if delete occurred, send 204
    if(result.deletedCount > 0){
        return res.status(204).send()
    }else{
        res.setHeader('content-type', 'application/json');
        res.status(404).send({ Error: "Not found"})
    }

}))

app.delete("/all", asyncHandler(async(req,res)=>{
    
    // generate filter based on query argument
    let filter = {}

    // delete exercises using filter
    let result = await model.deleteMany(filter)

    // if delete occurred, send 204
    if(result.deletedCount > 0){
        return res.status(204).send()
    }else{
        res.setHeader('content-type', 'application/json');
        res.status(404).send({ Error: "Not found"})
    }

}))

// Start the app
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});