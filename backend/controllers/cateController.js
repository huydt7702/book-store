const Cate = require("../models/Cate");
const slugify = require("slugify");

const cateController = {
    //GET ALL USERS
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
            const cate = await Cate.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete category successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = cateController;
