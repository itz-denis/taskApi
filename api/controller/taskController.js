const Task = require("../model/taskModel");

// יצירת משימה חדשה
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// קבלת כל המשימות של משתמש מסוים
exports.getUserTasks = async (req, res) => {
    try {
        const { localUserId } = req.params;
        const tasks = await Task.find({ localUserId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// קבלת משימה לפי ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// עדכון משימה לפי ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// מחיקת משימה לפי ID
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔥 פונקציות מגניבות 🔥 

// 1️⃣ קבלת משימות של משתמש מסוים עם סינון לפי סטטוס
exports.getUserTasksByStatus = async (req, res) => {
    try {
        const { localUserId, status } = req.params;
        const tasks = await Task.find({ localUserId, status });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ קבלת משימות של משתמש מסוים ממוין לפי עדיפות
exports.getUserTasksByPriority = async (req, res) => {
    try {
        const { localUserId } = req.params;
        const tasks = await Task.find({ localUserId }).sort({ priority: 1 }); // ממוין לפי עדיפות
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ חיפוש משימות לפי כותרת
exports.searchTasksByTitle = async (req, res) => {
    try {
        const { localUserId, title } = req.params;
        const tasks = await Task.find({ localUserId, title: { $regex: title, $options: "i" } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ קבלת מספר המשימות של משתמש לפי סטטוס (לוח סטטיסטיקות)
exports.getTaskCountsByStatus = async (req, res) => {
    try {
        const { localUserId } = req.params;
        const counts = await Task.aggregate([
            { $match: { localUserId: parseInt(localUserId) } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
