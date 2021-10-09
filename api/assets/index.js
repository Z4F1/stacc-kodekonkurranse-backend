const fetch = require("node-fetch")
const router = require("express").Router()

const Auth = require("../auth")

const BidModel = require("../bids/BidModel")

router.use(Auth.NeedsAuthorization)

router.get("/:offset", async (req, res, next) => {
    try {
        const data = await (await fetch("https://api.opensea.io/api/v1/assets?order_direction=desc&offset=" + req.params.offset + "&limit=20")).json()

        res.json(data.assets)
    } catch (error) {
        next(error)
    }
})

router.get("/:offset/sort/:orderby/order/:order", async (req, res, next) => {
    try {
        const data = await (await fetch("https://api.opensea.io/api/v1/assets?order_direction=" + req.params.order + "&offset=" + req.params.offset + "&order_by=" + req.params.orderby + "&limit=20")).json()
        
        res.json(data.assets)
    } catch (error) {
        next(error)
    }
})

router.get("/:address/id/:id", async (req, res, next) => {
    try {
        const data = await (await fetch("https://api.opensea.io/api/v1/asset/" + req.params.address + "/" + req.params.id)).json()

        if(data.success == false){
            // Delete all bids with that address and id
            const removed = await BidModel.deleteMany({ contract_address: req.params.address, token_id: req.params.id.toString()})
            console.log(removed)
        }
        res.json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router