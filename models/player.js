const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    description: { type: String, required: false },
    image: { type: "string", required: true }
});



module.exports = mongoose.model("Player", playerSchema);
