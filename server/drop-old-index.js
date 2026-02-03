const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        console.log("🔄 Dropping orderId_1 index...");
        await mongoose.connection.db.collection("quotes").dropIndex("orderId_1");
        console.log("✅ Index dropped successfully!");
        console.log("🚀 You can now restart the server and create quotes.");
        process.exit(0);
    } catch (err) {
        if (err.message.includes("index not found")) {
            console.log("✅ Index doesn't exist (already dropped or never created)");
            process.exit(0);
        }
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}).catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
});
