const express = require('express')
const app = express()

app.use(express.json())

const router = require('./router')
router(app)

const PORT = process.env.PORT || 5000;

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});