var express = require('express')
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('actions'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewURLParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', ()=> console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to database"));

app.post("/sign_up", (req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data={
        "name": name,
        "email": email,
        "passowrd": password
    }

    db.collection('users').insertOne(data,(err, collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    })

    return res.redirect('index.html')
})

app.get("/", (req,res) => {
    res.set({"Allow-access-Allow-Origin": '*'
    })
    return res.redirect('login.html');
})

app.listen(3000, () => {
    console.log('Server at 3000')
})