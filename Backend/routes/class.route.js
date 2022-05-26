"use strict";

const express = require("express");
const classController = require("../controllers/class.controller");
const router = new express.Router();

// import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/class");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({
  storage: storage,
});

// const { checkTokenAdmin } = require("../auth/token-admin");

router.get("/", classController.getAll);
router.get("/:id_category", classController.getCategory);
router.get("/getId/:id", classController.getId);
router.post("/", upload.single("image_class"), classController.add);
router.put("/:id", upload.single("image_class"), classController.update);
router.delete("/:id", classController.delete);
router.post("/find/:id", classController.find)


module.exports = router;