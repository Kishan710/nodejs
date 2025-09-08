const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join('views'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


app.use(express.static(path.join()));


app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to GymPro' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About GymPro' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact GymPro' });
});


