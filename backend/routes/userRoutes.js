const express = require("express")
const router = express.Router()

//Controller
const userController = require("../controllers/userController")

router.route("/").post(userController.createuser)
router.route("/:id").get(userController.getUser)

module.exports = router