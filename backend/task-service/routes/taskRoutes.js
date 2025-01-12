const express = require('express');
const { collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const { db } = require('../firebase-config');

const router = express.Router();

// Tasks Collection Reference
const tasksCollection = collection(db, 'tasks');

// Create a Task (POST /api/tasks)
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = { title, description, dueDate, status, createdAt: new Date() };
    const result = await addDoc(tasksCollection, task);
    res.status(201).json({ id: result.id, ...task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Tasks (GET /api/tasks)
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(tasksCollection);
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Task (GET /api/tasks/:id)
router.get('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskRef = doc(db, 'tasks', taskId);
    const docSnap = await getDoc(taskRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Task (PUT /api/tasks/:id)
router.put('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, status } = req.body;
    const updatedTask = { title, description, dueDate, status, updatedAt: new Date() };
    const taskRef = doc(db, 'tasks', taskId);

    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await updateDoc(taskRef, updatedTask);
    res.status(200).json({ id: taskId, ...updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Task (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskRef = doc(db, 'tasks', taskId);

    const docSnap = await getDoc(taskRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await deleteDoc(taskRef);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
