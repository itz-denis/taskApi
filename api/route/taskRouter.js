const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

// יצירת משימה חדשה
router.post("/", taskController.createTask);

// קבלת משימות לפי משתמש
router.get("/user/:localUserId", taskController.getUserTasks);

// קבלת משימה לפי מזהה
router.get("/id/:id", taskController.getTaskById);


// עדכון משימה לפי ID
router.put("/:id", taskController.updateTask);

// מחיקת משימה לפי ID
router.delete("/:id", taskController.deleteTask);

// 🔥 מסלולים מיוחדים 🔥 

// קבלת משימות לפי סטטוס
router.get("/:localUserId/status/:status", taskController.getUserTasksByStatus);

// קבלת משימות ממוין לפי עדיפות
router.get("/:localUserId/sorted/priority", taskController.getUserTasksByPriority);

// חיפוש משימות לפי כותרת
router.get("/:localUserId/search/:title", taskController.searchTasksByTitle);

// קבלת מספר משימות לפי סטטוס
router.get("/:localUserId/stats", taskController.getTaskCountsByStatus);

module.exports = router;
