const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes/routes')

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

////////////////// Mongo DB //////////////////////////////////
mongoose.connect('mongodb+srv://user_grp:switchMaven980@smbootcamp2020.dw1al.gcp.mongodb.net/mac-app-db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, 
    function(err, database){
        if(err){
            throw err
        }
        console.log("Connection made to database")
    }
)

/////////////////// ROUTES /////////////////////////////////

app.use(routes)

//////////////////// 404 Handling //////////////////////////

app.all('*', function(req, res){
    //create a page for this
    res.send("<h1> Sorry the page you requested is not found </h1>")
})
///////////////////////////////////////////////////////////////

app.listen(3330, () => console.log("app listening at http://localhost:3000"))