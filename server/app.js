const express = require('express');
const app = express();

require('dotenv').config();
require('express-async-errors');

const { Band, Musician } = require('./db/models');

app.use(express.json());


// STEP 1: Order by one attribute
// Get all bands, ordered by createdAt, latest first
app.get('/bands/latest', async (req, res, next) => {
    const bands = await Band.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(bands);
})

// STEP 2: Order by multiple attributes
// Get all musicians, ordered by last name, then first name, alphabetically
app.get('/musicians/alphabetic', async (req, res, next) => {
    const musicians = await Musician.findAll({ 
        order: [['lastName','ASC'],['firstName','ASC']]
    });
    res.json(musicians);
})

// STEP 3: Order by multiple attributes, including nested attributes
// Get bands and associated musicians, ordered by band name, then musician last 
// name, then first name, alphabetically
app.get('/bands/alphabetic-musicians', async (req, res, next) => {
    const bands = await Band.findAll({ 
        include: { model: Musician }, 
        // Your code here
    })
    res.json(bands);
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));