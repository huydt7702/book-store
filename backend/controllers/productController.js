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
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete product successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE PRODUCT
    updateProduct: async (req, res) => {
        const id = req.params.id;
        const formData = req.body;

        if (
            !formData.title ||
            !formData.author ||
            !formData.desc ||
            !formData.year ||
            !formData.categoryId ||
            !formData.price ||
            !formData.image
        ) {
            return res.status(400).json({
                success: false,
                message: "Please complete all information!",
            });
        }

        const newSlug = slugify(formData.title, { lower: true });
        const data = {
            title: formData.title,
            author: formData.author,
            desc: formData.desc,
            year: formData.year,
            categoryId: formData.categoryId,
            price: formData.price,
            image: formData.image,
            slug: newSlug,
        };

        try {
            await Product.updateOne({ _id: id }, data);
            res.status(200).json({
                success: true,
                message: "Catalog update successful",
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Catalog update failed!",
            });
        }
    },
};

module.exports = productController;
