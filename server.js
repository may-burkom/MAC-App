const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb+srv://user_grp:switchMaven980@smbootcamp2020.dw1al.gcp.mongodb.net/mac-app-db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err, database){
        if(err){
            throw err
        }
        console.log("Connection made to database")
    }
)



app.listen(3000, () => console.log("app listening at http://localhost:3000"))