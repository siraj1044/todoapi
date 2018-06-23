
const express = require('express');
const app = express();
const cors = require('cors');

// Requiring the db file will execute its contents and initiate the mongodb connection
require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Requiring the api file will get the exported function from the file
const api = require('./api/index');
// Now we will pass app to the function to register the routers within the api/index.js file
api(app);

app.use(express.static(__dirname + '/public'));

app.use((err, req, res, next) => {
  res.status(500)
  .json({
    "error": err
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
