const Cate = require("../models/Cate");
const slugify = require("slugify");

const cateController = {
    //GET ALL CATEGORIES
    getAllCategories: async (req, res) => {
        try {
            const cate = await Cate.find();
            res.status(200).json(cate);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //ADD CATEGORY
    addCategory: async (req, res) => {
        // Create new cate
        const newCate = await new Cate({
            name: req.body.name,
            slug: slugify(req.body.name, { replacement: "-", lower: true }),
        });

        //Save to DB
        const cate = await newCate.save();
        res.status(200).json(cate);
    },

    //DELETE CATEGORY
    deleteCategory: async (req, res) => {
        try {
            await Cate.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete category successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE CATEGORY
    updateCategory: async (req, res) => {
        const id = req.params.id;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "You must enter category name",
            });
        }

        try {
            const category = await Cate.findById(id);
            if (!category) {
                return res.json("Category does not exist");
            }

            category.name = name;
            category.slug = slugify(name, { lower: true });

            await category.save();

            return res.status(200).json({
                success: true,
                message: "Catalog update successful",
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Catalog update failed!",
            });
        }
    },
};

module.exports = cateController;
