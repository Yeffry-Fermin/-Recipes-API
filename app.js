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

function middlewareLogger (req, res, next) {
    console.log(req.method)
    console.log(req.originalUrl)
    next()
}

//Create(POST) Read(GET) Update(PATCH) Delete(delete)
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(middlewareLogger)

app.get("/api/recipes", (request, response) => {
  response.json(recipes);
});

app.post('/api/recipes', (request, response) => {
    const data = request.body
    const recipe = {...data, id: nextId++, }
    recipes.push(recipe)
    response.status(201).json(recipe)
})

app.get("/api/recipes/:id", (request, response) => {
    const recipe = recipes.find((recip) => {
        return recip.id === Number(request.params.id)
    })
    // console.log(recipe)
    if(recipe) {
        response.json(recipe)
    } else {
        response.status(404).send('not Found')
    }
});

app.patch("/api/recipes/:id", (request, response) => {
    const recipe = recipes.find((recip) => {
        return recip.id === Number(request.params.id)
    })
    if(recipe) {
        Object.assign(recipe, request.body)
        response.status(200).json(recipe)
    } else {
        response.status(404).send("Not found")
    }
})

app.delete("/api/recipes/:id", (request, response) => {
    const recipe = recipes.find((recip) => {
        return recip.id === Number(request.params.id)
    })
    if(recipe) {
        recipes = recipes.filter((recipe) => {
            return recipe.id != Number(request.params.id)
        })
        response.status(204).send('Recipe deleted')
    } else {
        response.status(404).send('Recipe not found')
    }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
