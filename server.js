//Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');



// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app  = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());    
// Initialize the main project folder
app.use(express.static(__dirname+'/website'));

// Express Routes
app.post('/addData',(req,res)=>{
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
})

app.get('/allData',(req,res)=>{
   res.send(projectData);
})

const PORT =process.env.PORT|| 3000;

// Setup Server
app.listen(PORT,()=>{
    console.log(`Cors-Enabled web server listing at ${PORT}`)
});