require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const scheme = require('./scheme')
const app = express()


app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.DB_CODE,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log('connected to database')
});



app.get('/', (req,res)=>{
    res.redirect('/main.html')
})

app.post('/comment', (req,res)=>{

    let comment = new scheme({
        name: req.body.name,
        msg: req.body.msg
    })

    try{
        comment.save((err,result)=>{
            res.json({msg:"comment sent"})
        })
    }catch(err){
        res.send(err)
    }
    



    
})

app.get('/comments',(req,res)=>{
    scheme.find((err,result)=>{
        if(err){
            res.json({ msg:"there are no comments yet"})
        }else{
            res.send(result)
        }
    })
})


app.listen(process.env.PORT, ()=>{
    console.log('server running at port ' + process.env.PORT);
})