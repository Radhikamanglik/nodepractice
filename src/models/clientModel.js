const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required:true,
    }
})

module.exports = mongoose.model("Client", clientSchema)