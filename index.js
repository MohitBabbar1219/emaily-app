const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({msg: "hi there"});
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})