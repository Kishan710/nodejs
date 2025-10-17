const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');
const { movieRouter } = require('./routes/movieroute');
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', movieRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log('Server running on port', PORT);
  } catch (err) {
    console.error('Startup error', err);
  }
});
