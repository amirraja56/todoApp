const mongoose=require('mongoose');
const validator=require('validator');

const listSchema=new mongoose.Schema({

    input: {
        type: String,
        required: true,
        minlength: 3
      }
});

const listData= new mongoose.model('crudOperation',listSchema);
module.exports=listData;