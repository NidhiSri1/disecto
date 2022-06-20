const mongoose = require("mongoose");

// const Collection = new mongoose.Schema([
//     {
//         // user: {
//         //     type: mongoose.Schema.Types.ObjectId,
//         //     ref: "users",
//         //     required: true,
//         // },
//         description: { type: String, required: true },
//         image: [{ type: String }],
//     },
// ]);

// module.exports = mongoose.model("collection", Collection);

const Collection = new mongoose.Schema(
    {
        description: {
            type: String,
        },
        pictures: {
            type: String,
            required: true,
        },
        // user_id:{
        //     type:mongoose.Schema.Types.ObjectId,
        // }
    },
    {
        versionKey: false,
    }
);
module.exports = mongoose.model("collection", Collection);

// ******************** route ***************
