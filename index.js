const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const {User} = require("./models/User");
const config = require("./config/key");
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//applicaion/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected...'))
  .catch(err=>console.log(err))


app.get('/',(req,res)=>res.send('Hello World! 이리온'))

app.post('/register',(req,res)=>{

  //회원가입 시 필요한 정보들을 클라이언트에서 가져오면
  //그것들을 데이터베이스에 넣어준다.

    const user=new User(req.body)

    user.save((err,userInfo)=>{
      if(err) return res.json({success:false,err})
      return res.status(200).json({
        success:true
      })
    })

})

app.listen(port,()=>console.log(`Example app listening on port ${port}!`))