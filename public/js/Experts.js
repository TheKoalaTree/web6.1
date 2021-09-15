const mongoose = require("mongoose")

const expertScheme = new mongoose.Schema(
    {
        expert_id: {
            type: String,
            required: 'expert id'
        },
        expert_password: {
            type: String,
            required: 'expert password'
        },
        expert_name: {
            type: String,
            required: 'please enter your task name'
        },
        expert_address: {
            type: String,
            required: 'expert address'
        },
        expert_phone: {
            type: String,
            required: 'expert phone'
        },
    }
)

module.exports = mongoose.model("Expert", expertScheme);
