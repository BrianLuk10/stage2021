const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use( bodyParser.json() )
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(cors())
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

// simple route
app.get("/", (req, res) => {
    res.json("Bienvenue dans le backend ");
});

require("./routes/articles.route.js")(app);
require("./routes/categories.route.js")(app);
require("./routes/dons.route.js")(app);

// set port, listen for requests
app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});