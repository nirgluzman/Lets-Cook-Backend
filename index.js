require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const pool = new Pool();

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});

// GET /api/categories  : to get list of categories
app.get("/api/categories", (req, res) => {
  pool
    .query("SELECT * FROM category")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET /api/:category_id/recipes  : to get list of recipes belong to category_id
app.get("/api/:category_id/recipes", (req, res) => {
  const { category_id } = req.params;
  pool
    .query(`SELECT (id, title, image) FROM recipe WHERE category_id=$1`, [
      category_id,
    ])
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET /api/recipe/:recipe_id  : to get full data of a recipe_id
app.get("/api/recipe/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;

  pool
    .query(
      `SELECT 
        recipe.id, 
        recipe.title,
        recipe.image, 
        recipe.rating, 
        recipe.instructions, 
        array_to_json(array_agg(json_build_object('amount', recipe_ingredients.amount, 'ingredient', ingredient.name))) AS ingredients
        FROM 
        recipe, recipe_ingredients, ingredient
        WHERE recipe.id=$1 AND recipe_ingredients.recipe_id=recipe.id AND recipe_ingredients.ingredient_id=ingredient.id
        GROUP BY recipe.id`,
      [recipe_id]
    )
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});
