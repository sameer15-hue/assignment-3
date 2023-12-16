import express from "express";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('Connected!'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const app = express();
const PORT = 4000;

app.use(express.json());

const Schema = mongoose.Schema;
const details = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: Number
    }
);
const data = mongoose.model('data', details);
app.get('/add',(req,res)=>{
    res.send(req.body.name);
    console.log(req.body.name);
})
app.post('/add', async(req, res) => {
    try{
        await data.create(req.body).then(()=>{
            res.send(req.body);
        }).catch((error)=>{
            console.log(error)
        });
    }catch(error){
        console.log(error);
    }
    const user = req.body.name;
    //res.send(`Welcome ${user}`);
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});
