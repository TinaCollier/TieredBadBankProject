// server/index.js

const express = require("express");

const PORT = process.env.PORT || 4000;

const app = express();

const cors = require('cors');
app.use(cors());

const dal = require('../dal');


// Have Node serve the files for our built React app
app.use(express.static('public'));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
 

// create user account
app.get('/createaccount/:name/:email/:password', (req, res) => {
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log('user', user);
      res.send(user);
    });
  console.log(`account created: `);
});

// all accounts
app.get('/alldata/all', (req, res) => {
  dal.all().
    then((docs) => {
      console.log('docs', docs);
      res.send('docs');
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});