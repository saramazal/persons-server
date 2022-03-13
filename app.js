const express = require('express'); // import express module (simplifies routing/requests, among other things)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const bodyParser = require('body-parser');

const router = require('./router');
router(app)

const PORT = process.env.PORT || 5000;


app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static('build')); // serve static files (css & js) from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});