import mongoose from "mongoose";
import 'dotenv/config';

const db = mongoose.connection

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    {useNewUrlParser:true}
)

// Add listener to open event to log to console
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const {Schema} = mongoose

// define the Schema
const entrySchema = mongoose.Schema({
    title : {type: String, required:true},
    body: {type: String, required:true},
    date: {type: Date, required: true},
    tags: {type: Array, required: false}
},
{timestamps: true})

// compile the model from the schema
const Entry = mongoose.model("Entry", entrySchema)

/**
 * Retrieves Entries based on filter
 * @param {Object} filter filters the query
 * @returns Array of Objects matching the filter
 */
const get = async(filter={}, options={}) =>{
    const query = Entry.find(filter).skip(options.offset).sort('-date').limit(options.limit)
    return query.exec()
}

const countOfDocuments = async(filter) =>{
    const query = await Entry.countDocuments(filter)
    return {count: query}
}

/**
 * 
 * @param {Object} entry 
 * @returns 
 */
const create = async(entry) =>{
    const query = new Entry(entry)
    return query.save()
}

/**
 * Updates an entry
 * @param {String} filter
 * @param {Object} updates the object of updates for the Entry
 */
const update = async(filter, updates) =>{
    // update the part
    const result = await Entry.updateOne(filter,updates)
    return result
}

/**
 * Deletes an entry given ID
 * @param {String} filter filter to find the entry to delete
 */
const deleteEntry = async(filter) =>{
    const result = await Entry.deleteOne(filter)

    // reform the result to send back
    return {deletedCount: result.deletedCount}
}

const deleteMany = async(filter) =>{
    const result = await Entry.deleteMany(filter)

    // reform the result to send back
    return {deletedCount: result.deletedCount}
}

export {get, countOfDocuments,create, update, deleteEntry, deleteMany}