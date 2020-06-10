const express = require('express');
const router = express.Router();
const Todo = require('../models/todo')
const multer = require('multer');

const upload = multer({
    // dest: 'images',
     limits: {
         fileSize: 1000000
     },
   
     fileFilter(req, file, cb) {
         console.log(req.file);
         console.log(file.originalname)
         if(!file.originalname.match(/\.(jpeg|jpg|png)/)){
            return cb(new Error('please upload a jpeg,jpg or png file'))
         }
        
         cb(undefined, true)
     }
  
 
 }) 

router.post('/', async (req, res) => {

    const todo = new Todo(req.body)
    try {
       await todo.save()
       res.send({error: false, todo})
    }catch(e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {

    try {
        const todo = await Todo.find();
        if(todo.length > 0) {
            res.send({error: false, data: todo})
        }else{
            res.send({error: false, data: []})
        }
    }catch(e) {
        console.log(e)
        res.status(400).send(e);
    }
} );

router.get('/:id', async (req, res) => {
    console.log('ruunnn')
    let id  = req.params.id;
    try {
        const todo = await Todo.findById(id);
        console.log(todo);
        if(todo) {
            res.send({error: false, data: todo})
        }else{
            res.send({error: false, data: []})
        }
    }catch(e) {
        console.log(e)
        res.status(400).send(e);
    }
} );

router.patch('/:id', async (req, res) => {
    console.log('ruuun')
    let id  = req.params.id;
    let updatekeys = Object.keys(req.body);
   
    try {
        const todo = await Todo.findById(id);
        console.log(todo);
        updatekeys.forEach(key => { todo[key] = req.body[key] });
        let result = await todo.save()
        console.log(result);
        if(!result) {
            return res.status(200).send({error : false, data: result,
            massege: 'No todo found'})
        }
        res.status(200).send({error : false, data: result})
    } catch (error) {
        console.log(error);
          return res.status(500).send({error : error, data: []})

    }

})

router.delete('/:id', async (req, res) => {
    let id  = req.params.id;
    try {
        const result = await  Todo.findByIdAndDelete(id);
        if(!result) {
            return res.status(200).send({error : false, data: result,
            massege: 'No todo found to delete'})
        }
        res.status(200).send({error : false, data: result})
    } catch (error) {
          return res.status(500).send({error : error, data: []})

    }
})





module.exports = router;