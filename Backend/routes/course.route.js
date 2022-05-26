"use strict";

const express = require("express");
const courseController = require("../controllers/course.controller");
const router = new express.Router();

// import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/course");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({
  storage: storage,
});

// const { checkTokenAdmin } = require("../auth/token-admin");

router.get("/", courseController.getAll);
router.get("/:id", courseController.getId);
router.post("/",  upload.single("image"), courseController.add);
router.put("/:id", upload.single("image"),courseController.update);
router.delete("/:id", courseController.delete);
router.post("/find", courseController.find);

module.exports = router;
