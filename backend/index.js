const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cateRoute = require("./routes/category");
const productRoute = require("./routes/product");
const commentRoute = require("./routes/comment");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("CONNECTED TO MONGO DB");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/category", cateRoute);
app.use("/v1/product", productRoute);
app.use("/v1/comment", commentRoute);

app.listen(5555, () => {
    console.log("Server is running");
});
