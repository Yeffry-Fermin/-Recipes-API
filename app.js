function middlewareLogger(req, res, next) {
  console.log(req.method);
  console.log(req.originalUrl);
  next();
}


//Create(POST) Read(GET) Update(PATCH) Delete(delete)
const apiRouter = require('./api')
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(middlewareLogger);


function errorHandler(err, req, res, next) {
    console.log(err)
    res.sendStatus(500)
}

app.use(errorHandler)
app.use('/api', apiRouter)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
