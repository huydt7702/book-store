const Comment = require("../models/Comment");
const Product = require("../models/Product");

const commentController = {
    //GET ALL COMMENTS
    getAllComments: async (req, res) => {
        try {
            const productId = req.params.productId;
            const data = await Comment.find({ productId });

            if (!data) {
                return res.status(404).json({
                    message: "There are no reviews for this product yet",
                });
            }

            return res.status(200).json({
                data: data,
                message: "Data found",
            });
        } catch (err) {
            res.status(403).json("Error: " + err);
        }
    },

    //ADD COMMENT
    addComment: async (req, res) => {
        const { username, productId } = req.body;

        try {
            const comment = await Comment.findOne({ productId, username });
            if (comment) {
                return res.status(400).json({
                    success: false,
                    message: "You have already rated this product",
                });
            }

            const newComment = await Comment.create(req.body);

            const comments = await Comment.find({ productId });
            const totalScore = comments.reduce((sum, comment) => sum + comment.rating, 0);
            const reviewCount = comments.length;
            const averageScore = totalScore / reviewCount;

            const product = await Product.findOne({ _id: productId });
            product.review_count = reviewCount;
            product.average_score = averageScore;

            await product.save();

            return res.status(200).json({
                message: "Successful product review",
                data: newComment,
            });
        } catch (error) {
            return res.status(403).json({
                message: `Error : ${error}`,
                success: false,
            });
        }
    },

    //DELETE COMMENT
    deleteComment: async (req, res) => {
        try {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete comment successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = commentController;
