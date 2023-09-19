const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes.js');
const scoresRoute = require('./routes/scoresRoutes.js');
const path = require('path');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'Client/build')));

app.use('/api/users', userRoute);
app.use('/api/scores', scoresRoute);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
  });

async function init() {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'usersDB',
  });
  if (connection) {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is listening on port:`, PORT);
    });
  }
}

init();
