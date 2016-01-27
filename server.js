const express = require('express')
const app = express()

app.use(express.static('public')) //Folder

app.listen(8080, () => console.log('Servidor iniciado con Express en el puerto 80'))
