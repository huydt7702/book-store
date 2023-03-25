const mongoose = require("mongoose");

const cateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 6,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            minLength: 6,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cate", cateSchema);
