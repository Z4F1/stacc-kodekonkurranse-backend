const mongoose = require("mongoose")

const { Schema } = mongoose

const bidSchema = new Schema({
    contract_address: {
        type: String,
        required: true
    },
    token_id: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const BidModel = mongoose.model("Bid", bidSchema)

module.exports = BidModel