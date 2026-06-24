const router = require('express').Router()
const recipeRouter = require('./recipes')
const reviewsRouter = require('./reviews')

router.use('/recipes', recipeRouter)
router.use('/recipes', reviewsRouter)
router.use('/reviews', reviewsRouter)

module.exports = router
