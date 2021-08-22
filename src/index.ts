import express from 'express';

const app  = express();

app.get('/ping',(req,res)=>{
    res.send('Pong again');
})

app.listen(8080, ()=>{
    console.log('Server Started');
})