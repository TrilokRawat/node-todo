const mongoose = require('mongoose');


const todoSechema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
          
        },
        description: {
            type: String,
            required: true,
            trim: true,
           
        },
        thumbnail: {
            type: String
        },            
        links: {
            type: String
        },            
    },{
        timestamps: true
    }
)


const Todo = mongoose.model('Todo', todoSechema);



module.exports = Todo;