const express = require('express');
const app = express();

require('dotenv').config();
require('express-async-errors');

const { Band, Musician } = require('./db/models');

app.use(express.json());


app.get('/bands/latest', async (req, res, next) => {
    const bands = await Band.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(bands);
})

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
        order: [['name','ASC'],[Musician, 'lastName','ASC']]
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