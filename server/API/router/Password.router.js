const express = require("express");
require("dotenv").config();
const router = express.Router();
const PasswordController = require("../controllers/Password.controller");

router.post("/",async (req, res, next) => {
    console.log("Welcome");
    PasswordController.create(req, res, next)
});



router.
    route("/:id")
    .put((req, res, next) => {
        UsersController.update(req, res, next)
    })
    .delete((req, res, next) => {
        UsersController.delete(req, res, next)
    });

module.exports = router;



