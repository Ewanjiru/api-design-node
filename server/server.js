// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let lions = [{name:"Simba", id: "1", age:"3", pride:"King", gender:"male"}];
let id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions',(req, res)=>{
    res.json(lions);
});

app.get('/lions/:id',(req, res)=>{
    const lion = lions.filter(lion => lion.id===req.params.id);
    res.json(lion);
});

app.post('/lions',(req, res)=>{
    let data = req.body;
    (data && data)? id++ : id;
    data = Object.assign(data, {id: ''+id+''})
    lions = [...lions, data];
    res.json(lions);
});

app.put('/lions/:id',(req, res)=>{
    const lionId = req.params.id;
    const body = req.body;
    let lion = lions.filter((lion, index) => lion.id===lionId);
    lions.splice(index,1,body); 
    res.json(lions);
});

app.delete('/lions/:id',(req, res)=>{
    const lionId = req.params.id;
    lions = lions.findIndex(lion => lion.id === lionId).splice(lion,1);
    res.json(lions);
});

app.listen(3000);
console.log('on port 3000');
