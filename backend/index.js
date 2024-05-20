const express = require('express');
require('./db/db')
const listData = require('./modals/schema');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

const Port = process.env.PORT || 4004;

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', (req, res) => {
    // console.log(req.body)
    const newData = new listData(req.body)
    // console.log(newData)
    newData.save().then(() => {
        console.log("data saved")
        res.status(200).send("data saved")
    }).catch((e) => {
        console.log(`data not saved : ${e}`)
        res.status(401).send(`data not saved : ${e}`)
    })
});

app.get('/', (req, res) => {
    const main = async () => {
        try {
            const data = await listData.find();
            // console.log(data)
            res.send(data);
        } catch (err) {
            console.log(err)
            res.status(401).send("failed to load")
        }
    }
    main();
});

app.patch('/:id',async(req,res)=>{
    console.log(req.body)
    try{
        const id=req.params.id; 
        const data=await listData.findByIdAndUpdate(id, req.body,{new : true});
        // console.log(data)
       }catch(e){
           res.status(404).send(e);
        }
});


app.delete('/:id', async (req, res) => {
    // console.log(req.params.id)
       const _id = req.params.id;
    try {
          await listData.findByIdAndDelete({_id});
          res.status(200).json({ success: true, message: 'Data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.listen(Port, () => {
    console.log(`listening port is ${Port}`);
})
