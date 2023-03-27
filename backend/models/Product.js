const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        author: { type: String, require: true },
        desc: { type: String, require: true },
        year: { type: Number, require: true },
        categoryId: { type: String, require: true },
        price: { type: Number, require: true },
        image: { type: String, require: true },
        slug: { type: String, require: true },
        review_count: { type: Number, default: 0 },
        average_score: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
