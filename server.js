const express = require('express')
const app = express()

app.use(express.static('public')) //Folder

app.listen(80)
