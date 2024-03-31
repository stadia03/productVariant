const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());


require('dotenv').config();
const mongoDb=process.env.mongoDbkeys;
// const mongoDb='mongodb+srv://ujan2003:India1947@cluster0.q4ay57o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDb)
  .then(() => {
    console.log('Successfully Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Listening on port 4000');
    });
  })
  .catch((err) => {
    console.log('Some issues regarding connection: ' + err);
  });

app.use('/products', productRoutes);

