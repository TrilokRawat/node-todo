const express = require('express');
// const mongodb = require('mongodb');
const todoRouter = require('./routers/todo')
// const multer = require('multer');
const cors = require('cors')
require('./db/mongoose');


const port = process.env.port || 4000;
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use('/todo',todoRouter)

app.get('/', (req, res) => {
res.send('app started succesfully');
});




app.listen(port,() => {
    console.log('server connected at 4000');
});


