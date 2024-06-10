const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Schema = mongoose.Schema;
const inventorySchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  reorderPoint: { type: Number, required: true },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
});

// Add a new inventory item
router.post('/', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding inventory item:', error);
    res.status(500).json({ message: 'Error adding inventory item', error });
  }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Error updating inventory item', error });
  }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ message: 'Error deleting inventory item', error });
  }
});

module.exports = router;
