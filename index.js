const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) =>res.json({message: 'Hello'}))


const port = 3000;

app.listen(port, ()=>console.log(`App is running on port ${port}`))