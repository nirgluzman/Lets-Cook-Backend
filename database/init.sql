CREATE TABLE "category" (
  "id" SERIAL,
  "name" VARCHAR(100),
  PRIMARY KEY ("id")
);

CREATE TABLE "recipe" (
  "id" SERIAL,
  "category_id" INT,
  "title" VARCHAR(100),
  "image" VARCHAR(255),
  "rating" INT,
  "instructions" TEXT,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_recipe.category_id"
    FOREIGN KEY ("category_id")
      REFERENCES "category"("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "ingredient" (
  "id" SERIAL,
  "name" VARCHAR(100),
  PRIMARY KEY ("id")
);

CREATE TABLE "recipe    _ingredients" (
  "recipe_id" INT,
  "ingredient_id" INT,
  "amount" VARCHAR(100),
  PRIMARY KEY ("recipe_id", "ingredient_id"),

  CONSTRAINT "FK_recipe_ingredients.recipe_id"
  FOREIGN KEY("recipe_id")
     REFERENCES "recipe"("id") ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT "FK_recipe_ingredients.ingredient_id"
  FOREIGN KEY("ingredient_id")
     REFERENCES "ingredient"("id") ON UPDATE CASCADE ON DELETE CASCADE   
);

