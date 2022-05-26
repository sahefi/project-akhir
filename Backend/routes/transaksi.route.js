'use strictt'

const express = require("express");
const transaksiController = require("../controllers/transaksi.controller");
const router = new express.Router()

router.post("/", transaksiController.add)
router.post("/addDetail", transaksiController.addDetail)
router.get("/:id_transaksi", transaksiController.get)
router.get("/sum/:id_transaksi", transaksiController.total)
router.put("/bayar/:id_transaksi", transaksiController.bayar)
router.get("/myclass/:id_user", transaksiController.myclass)
router.post("/find/:id_user", transaksiController.find)
router.post("/findClass/:id_user", transaksiController.findCategory)
router.post("/findUser", transaksiController.findUser)
router.get("/detail/:id_class/:id_user", transaksiController.detail)
router.get("/getUser/user", transaksiController.getUser)

module.exports = router;