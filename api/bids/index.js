const router = require("express").Router()

const Auth = require("../auth")

const BidModel = require("./BidModel")

router.use(Auth.NeedsAuthorization)

router.get("/", async (req, res, next) => {
    try {
        const bids = await BidModel.find()

        res.json(bids)
    } catch (error) {
        next(error)
    }
})

router.get("/:contract_address/id/:token_id", async (req, res, next) => {
    try {
        const bids = await BidModel.find(req.params)
        
        console.log(req.params)
        console.log(bids)

        res.json(bids)
    } catch (error) {
        next(error)
    }
})

router.get("/user", async (req, res, next) => {
    try {
        const bids = await BidModel.find({user_id: req.userdata._id})

        res.json(bids)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        req.body.user_id = req.userdata._id
        const newBid = new BidModel(req.body)
        const bid = await newBid.save()

        res.json(bid)
    } catch (error) {
        next(error)
    }
})

module.exports = router