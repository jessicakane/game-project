const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

async function init() {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI, { dbName: 'usersDB' });
      if (connection.connections[0].host) {
        console.log('Connected to DB');
        app.listen(PORT, () => {
          console.log('Listening on port ' + PORT);
        });
      } else {
        console.log(connection.connections[0]);
        process.exit(1);
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  init();
  

