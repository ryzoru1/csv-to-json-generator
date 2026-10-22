const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Papa = require('papaparse');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static frontend
app.use(express.static(path.join(__dirname)));

// In-memory dataset storage (default preset dataset)
let currentDataset = [
    { id: 1, name: "Iron Sword", type: "Weapon", attack: 25, price: 150, rarity: "Common" },
    { id: 2, name: "Fire Staff", type: "Weapon", attack: 45, price: 450, rarity: "Rare" },
    { id: 3, name: "Health Potion", type: "Consumable", attack: 0, price: 50, rarity: "Common" },
    { id: 4, name: "Dragon Shield", type: "Armor", attack: 60, price: 800, rarity: "Epic" },
    { id: 5, name: "Shadow Cloak", type: "Armor", attack: 35, price: 500, rarity: "Rare" },
    { id: 6, name: "Elixir of Mana", type: "Consumable", attack: 0, price: 120, rarity: "Uncommon" }
];

// API Endpoint to update dataset from CSV upload or raw text
app.post('/api/v1/sync', (req, res) => {
    try {
        const { data } = req.body;
        if (Array.isArray(data)) {
            currentDataset = data;
            return res.json({ status: "success", count: currentDataset.length });
        }
        res.status(400).json({ status: "error", message: "Invalid data format" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});

// Dynamic REST API endpoints for items / resources
app.get('/api/v1/:resource', (req, res) => {
    const limit = parseInt(req.query.limit) || currentDataset.length;
    const search = req.query.search ? req.query.search.toLowerCase() : null;

    let results = currentDataset;
    if (search) {
        results = results.filter(row => 
            Object.values(row).some(val => String(val).toLowerCase().includes(search))
        );
    }

    res.json({
        status: "success",
        count: Math.min(limit, results.length),
        total: results.length,
        data: results.slice(0, limit)
    });
});

app.get('/api/v1/:resource/:id', (req, res) => {
    const recordId = req.params.id;
    const primaryKey = currentDataset.length > 0 ? Object.keys(currentDataset[0])[0] : 'id';
    
    const record = currentDataset.find(r => 
        String(r[primaryKey]) === recordId || String(r['id']) === recordId
    );

    if (!record) {
        return res.status(404).json({ status: "error", message: `Record with ID '${recordId}' not found.` });
    }

    res.json({ status: "success", data: record });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CSV to JSON API Server running on port ${PORT}`);
});
