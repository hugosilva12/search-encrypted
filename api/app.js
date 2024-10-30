const express = require('express');
const cors = require("cors");
const app = express();
const controllers = require('./controllers');
const port = 8082;

//Create tables
const user = require('./models/user');
const harvastedReport = require('./models/harvasted_report');
const forwarder_report = require('./models/forwarder_report');


app.use(express.json());


app.get('/', (req, res) => res.send('Hugo!'));

//Routes
app.use( controllers.uploadFileController);
app.use(controllers.userController);
app.use(controllers.uploadFileForwarderController);
app.use(controllers.keysController);

app.use(cors());


app.listen(port, () => console.log(`Listening on port ${port}!`));


