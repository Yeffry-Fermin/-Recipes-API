const router = require('express').Router()
const recipeRouter = require('./recipes')

router.use('/recipes', recipeRouter)

module.exports = router
