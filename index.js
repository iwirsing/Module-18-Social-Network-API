const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//this is for labeling purposes, cwd() returns string of current working directory
const currentDirectory = process.cwd();
//check what this returns
console.log('current working directory: ',currentDirectory);
const activity = currentDirectory.includes('02-Challenge')
? currentDirectory.split('/02-Challenge/')[1]
: currentDirectory;

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(routes);

//listen
db.once('open', ()=>{
    app.listen(PORT, () => {
        console.log(`API server for ${activity} running on PORT ${PORT}`);
    })
});


