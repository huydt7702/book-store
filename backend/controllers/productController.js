const Product = require("../models/Product");
const slugify = require("slugify");

const productController = {
    //GET ALL PRODUCTS
    getAllProducts: async (req, res) => {
        try {
            const product = await Product.find();
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //ADD PRODUCT
    addProduct: async (req, res) => {
        // Create new product
        const newProduct = await new Product({
            title: req.body.title,
            author: req.body.author,
            desc: req.body.desc,
            year: req.body.year,
            categoryId: req.body.categoryId,
            price: req.body.price,
            image: req.body.image,
            slug: slugify(req.body.title, { replacement: "-", lower: true }),
            review_count: req.body.review_count,
            average_score: req.body.average_score,
        });

        //Save to DB
        const product = await newProduct.save();
        res.status(200).json(product);
    },

    //DELETE PRODUCT
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete product successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = productController;
