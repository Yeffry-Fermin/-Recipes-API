const express = require("express");
const apiRouter = require("./api/index");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// })
// app.use(middlewareLogger);
app.use("/api", apiRouter);

function errorHandler(err, req, res, next) {
  console.log(err);
  res.sendStatus(500);
}

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
