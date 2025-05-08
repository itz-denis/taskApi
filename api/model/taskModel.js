const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    localUserId:{type:Number , required:true}, // האיידי המקומי של האפליקציה אליו מקושר המשימות 
    title: { type: String, required: true }, // כותרת המשימה
    description: { type: String }, // תיאור המשימה
    dueDate: { type: Date, required: true }, // תאריך יעד
    status: { type: String, enum: ["pending", "completed"], default: "pending" }, // סטטוס המשימה
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }, // עדיפות
    labels: [{ type: String }], // תוויות (תגיות)
    attachments: [{ type: String }], // קישורים לקבצים מצורפים
    createdAt: { type: Date, default: Date.now } // תאריך יצירה
});

module.exports = mongoose.model("Task", taskSchema);
