const express = require('express');
const { moviemodel } = require('../models/moviemodel');
const path = require('path');
const fs = require('fs');
const { upload } = require('../middleware/multer');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movieData = await moviemodel.find({}).sort({ createdAt: -1 });
    res.render('home', { movieData });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const obj = {
      movieName: req.body.movieName,
      director: req.body.director,
      releaseYear: Number(req.body.releaseYear) || undefined,
      genre: req.body.genre,
      image: req.file ? '/uploads/' + req.file.filename : ''
    };
    await moviemodel.create(obj);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const editData = await moviemodel.findById(req.params.id);
    if (!editData) return res.redirect('/');
    res.render('edit', { editData });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/update', upload.single('image'), async (req, res) => {
  try {
    const id = req.body.id;
    const existing = await moviemodel.findById(id);
    if (!existing) return res.redirect('/');
    if (req.file) {
      if (existing.image) {
        const oldPath = path.join(__dirname, '..', existing.image);
        try { fs.unlinkSync(oldPath); } catch(e){}
      }
      req.body.image = '/uploads/' + req.file.filename;
    }
    await moviemodel.findByIdAndUpdate(id, {
      movieName: req.body.movieName,
      director: req.body.director,
      releaseYear: Number(req.body.releaseYear) || existing.releaseYear,
      genre: req.body.genre,
      image: req.body.image || existing.image
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.post('/delete', async (req, res) => {
  try {
    const id = req.body.id;
    const existing = await moviemodel.findById(id);
    if (existing && existing.image) {
      const p = path.join(__dirname, '..', existing.image);
      try { fs.unlinkSync(p); } catch(e){}
    }
    await moviemodel.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = { movieRouter: router };
