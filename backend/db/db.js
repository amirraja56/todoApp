const mongoose= require('mongoose');

// const url= "mongodb://127.0.0.1/students";
const url="mongodb+srv://amirraja56:raza@cluster0.vjl3pqj.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url).then(()=>{
    console.log("dataBase connected")
}).catch((err)=>{
    console.log(`dataBase connection failed---${err}`)
});
