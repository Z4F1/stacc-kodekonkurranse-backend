const router = require("express").Router()

const Auth = require("./auth")

const users = require("./users")
const bids = require("./bids")
const assets = require("./assets")

router.use(Auth.CheckToken)

router.get("/", (req, res) => {
    res.json({
        message: "You found the api section nice"
    })
})

router.get("/verify", async (req, res, next) => {
    console.log(req.userdata)
    res.json(req.authorized)
})

router.use("/users", users)
router.use("/bids", bids)
router.use("/assets", assets)

module.exports = router