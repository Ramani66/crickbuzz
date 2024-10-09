const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const { notFound ,errorHandler } = require('./middleware/errormiddleware')
const path = require('path')

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running");
});

app.use('/api/user', userRoutes);

// -----------------------------Deployement----------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname1 ,'/frontend/build')))

  app.get('*' ,(req,res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
}else {
  app.get('/' ,(req,res) => {
    res.send('hi')
  })
}

// -----------------------------Deployement----------------

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`.yellow.bold);
});
