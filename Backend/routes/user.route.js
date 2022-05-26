'use strictt'

const express = require("express")
const userController = require("../controllers/user.controller")
const router = new express.Router()

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/user");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({
  storage: storage,
});


router.get("/", userController.getAll)
router.get("/:id", userController.getId)
router.post("/", upload.single("img_user"), userController.add)
router.post("/find", userController.find)
router.put("/:id", upload.single("img_user"),userController.update)
router.delete("/:id", userController.delete)
router.post("/login", userController.login)
router.put("/delprof/:id", userController.deleteProfile)
router.put("/", userController.updatePw)
router.put("/update/:id_user", userController.pwUser)


module.exports = router;