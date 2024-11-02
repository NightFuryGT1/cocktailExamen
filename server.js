// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Ruta para obtener una lista de cócteles de tipo "Cocktail"
app.get('/cocktails', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=Cocktail`);
    const cocktails = response.data.drinks.slice(0, 15); // Obtener solo los primeros 15 cócteles
    res.json(cocktails);
  } catch (error) {
    console.error('Error fetching cocktails:', error.message);
    res.status(500).json({ error: 'Failed to fetch cocktails' });
  }
});

// Ruta para obtener los detalles de un cóctel por su ID
app.get('/cocktail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    const cocktail = response.data.drinks[0];
    res.json(cocktail);
  } catch (error) {
    console.error('Error fetching cocktail details:', error.message);
    res.status(500).json({ error: 'Failed to fetch cocktail details' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
