const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())

connectToMongo();
const port = 5000;


//using middleware to access res.body in auth.js
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNoteBook backend listening at http://localhost:${port}`)
})