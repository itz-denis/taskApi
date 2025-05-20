const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    localUserId:{type:Number , required:true}, // האיידי המקומי של האפליקציה אליו מקושר המשימות 
    title: { type: String, required: true }, // כותרת המשימה
    description: { type: String }, // תיאור המשימה
    dueDate: { type: Date, required: true }, // תאריך יעד
    status: { type: String, enum: ["Pending", "In Progress" ,"Completed"], default: "Pending" }, // סטטוס המשימה
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" }, // עדיפות
    labels: [{ type: String }], // תוויות (תגיות)
    attachments: [{ type: String }], // קישורים לקבצים מצורפים
    createdAt: { type: Date, default: Date.now } // תאריך יצירה
});

module.exports = mongoose.model("Task", taskSchema);
