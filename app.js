require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_URL;

const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect(connectionString).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const TaskRouter = require('./api/route/taskRouter');
app.use('/task',TaskRouter);







module.exports = app;