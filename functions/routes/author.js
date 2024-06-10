const express = require('express');
const InventoryItemModel = require('../models/author');

const router = express.Router();

// GET all authors
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await InventoryItemModel.find();
        res.json(inventoryItems);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// GET a single author
router.get('/:id', getInventoryItem, (req, res) => {
    res.json(res.inventoryItem);
});

// CREATE an author
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { name, quantity, reorderPoint } = req.body;
        if(!name || !quantity || !reorderPoint) {
            return res.status(400).json({message: 'Name, quantity, and reorder point are required'});
        }

        //check if the author's name already exists
           const existingItem = await InventoryItemModel.findOne({ name });
        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists' });
        }
        
          const newItem = new InventoryItemModel({ name, quantity, reorderPoint }); // Updated model name
        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item created successfully', item: savedItem });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//UPDATE AN AUTHOR
router.put('/:id', getInventoryItem, async (req, res) => {
    try {
        const updatedItem = await InventoryItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

 //DELETE AN AUTHOR
 router.delete('/:id', getInventoryItem, async (req, res) => {
    try {
        await res.inventoryItem.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

 //MIDDLEWARE FUNCTION TO GET SINGLE AUTHOR BY ID
 async function getInventoryItem(req, res, next) {
    try {
        const inventoryItem = await InventoryItemModel.findById(req.params.id); // Updated model name
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.inventoryItem = inventoryItem;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

 module.exports = router;
