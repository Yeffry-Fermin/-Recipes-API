function middlewareLogger(req, res, next) {
  console.log(req.method);
  console.log(req.originalUrl);
  next();
}


const express = require("express");
const recipeApiRouter = require('./api/index')
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(middlewareLogger);
app.use('/api', recipeApiRouter)


function errorHandler(err, req, res, next) {
    console.log(err)
    res.sendStatus(500)
}

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
