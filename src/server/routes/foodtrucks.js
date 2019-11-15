const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
  router.get('/all', (_, res) => {
    DB.findAllFoodtrucks().then(trucks => {
      res.status(200).json({
        trucks,
      })
    })
  })

  router.get('/:id', (req, res) => {
    const truckId = Number(req.params.id)
    DB.getFoodTruck(truckId).then(truck => {
      res.status(200).json({
        trucks: truck,
      })
    })
  })

  router.post('/:id/review', (req, res) => {
    const truckId = Number(req.params.id)
    const { pennID, rating, comment } = req.body
    DB.updateReview(truckId, {
      pennID: Number(pennID),
      rating: Number(rating),
      comment,
    }).then(truck => {
      res.status(200).json({
        trucks: truck,
      })
    })
  })

  return router
}
