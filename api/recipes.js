let recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    minutes: 25,
    servings: 4,
    vegetarian: false,
  },
  {
    id: 2,
    title: "Chana Masala",
    cuisine: "Indian",
    minutes: 35,
    servings: 4,
    vegetarian: true,
  },
  {
    id: 3,
    title: "Fish Tacos",
    cuisine: "Mexican",
    minutes: 20,
    servings: 3,
    vegetarian: false,
  },
  {
    id: 4,
    title: "Margherita Pizza",
    cuisine: "Italian",
    minutes: 40,
    servings: 2,
    vegetarian: true,
  },
  {
    id: 5,
    title: "Pad Thai",
    cuisine: "Thai",
    minutes: 30,
    servings: 2,
    vegetarian: false,
  },
];

let nextId = 6;

const router = require('express').Router()

function checkValidate(req, res, next) {
  if (req.body.title && req.body.cuisine) {
    next();
  } else {
    return res.status(400).send("Props missings");
  }
}

router.get("/", (request, response, next) => {
  try {
    response.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.post("/", checkValidate, (request, response, next) => {
  try {
    const data = request.body;
    const recipe = { ...data, id: nextId++ };
    recipes.push(recipe);
    response.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (request, response, next) => {
  try {
    const recipe = recipes.find((recip) => {
      return recip.id === Number(request.params.id);
    });
    if (recipe) {
      response.json(recipe);
    } else {
      response.status(404).send("not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", (request, response, next) => {
  try {
    const recipe = recipes.find((recip) => {
      return recip.id === Number(request.params.id);
    });
    if (recipe) {
      Object.assign(recipe, request.body);
      response.status(200).json(recipe);
    } else {
      response.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (request, response, next) => {
  try {
    const recipe = recipes.find((recip) => {
      return recip.id === Number(request.params.id);
    });
    if (recipe) {
      recipes = recipes.filter((recipe) => {
        return recipe.id != Number(request.params.id);
      });
      response.status(204).send("Recipe deleted");
    } else {
      response.status(404).send("Recipe not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
