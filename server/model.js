//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Setup article schema
let ArticleSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    url: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

//Create article model
let Article = mongoose.model("Article", ArticleSchema);

//Export
module.exports = Article;