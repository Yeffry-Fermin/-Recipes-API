let reviews = [
  {
    id: 1,
    recipeId: 1,
    reviewer: "Sam",
    rating: 5,
    comment: "Restaurant quality.",
  },
  {
    id: 2,
    recipeId: 1,
    reviewer: "Priya",
    rating: 4,
    comment: "Good but a little salty.",
  },
  { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;

const router = require('express').Router()

// We just need /:recipeId/reviews because we already have recipes ??
router.get("/:recipeId/reviews", (req, res) => {
  const reviewMatches = reviews.filter((rev) => {
    return rev.recipeId === Number(req.params.recipeId)
  })
  res.status(200).json(reviewMatches)
});

router.post("/:recipeId/reviews", (req, res) => {
  console.log('are we even here')

  if (req.body.rating >= 1 && req.body.rating <= 5) {
    const review = {
      id: nextReviewId++,
      reviewer: req.body.reviewer,
      rating: req.body.rating,
      comment: req.body.comment,
    };
    reviews.push(review);
    res.status(201).json(review);
  } else {
    res.sendStatus(400)
  }
});

router.delete('/:id', (req,res) => {
  reviews = reviews.filter((review) => review.id !== Number(req.params.id))
  res.status(204)
})

module.exports = router;
