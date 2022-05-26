"use strict";

// import express
const express = require("express");
const app = express();
app.use(express.json());

// import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// database
const db = require("../database");

// endpoint
module.exports = {
    //get semua data
    getAll: (req, res) => {
        const sql = "select * from class";
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan semua data",
                data: results,
            });
        });
    },

    // Get class berdasarkan id
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from class join category on class.id_category = category.id_category where id_class = ${id}`, (err, results) => {

            if (err) throw err;
            res.json({
                message: "Berhasil menampilkan data",
                data: results[0]
            });
        });
    },

    //get class berdasarkan id category
    getCategory: (req, res) => {
        const id = req.params.id_category;
        db.query(`select * from class join category on class.id_category = category.id_category where class.id_category = ${id}`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Data Kategori",
                data: results
            })
        })
    },

    // Tambah data class
    add: (req, res) => {
        if (!req.file) {
            res.json({
                message: "No uploaded file",
            });
        } else {
            let data = {
                name_class: req.body.name_class,
                image_class: req.file.filename,
                description_class: req.body.description_class,
                price: req.body.price,
                id_category: req.body.id_category,
                link_class: req.body.link_class
            };
            db.query(`select * from category where id_category = ${data.id_category}`, (err, result) => {
                if (err) {
                    throw err
                } else {
                    if (!result.length) {
                        res.json({ message: "category not found!" });
                    } else {
                        db.query(`insert into class set ?`, data, (err, results) => {
                            if ((null, err)) throw err;
                            res.json({
                                message: "Success added data",
                                data: data,
                            });
                        });
                    }
                }


            }
            );
        }
    },

    //Update data class
    update: (req, res) => {
        let id = req.params.id;
        let data = {
            name_class: req.body.name_class,
            description_class: req.body.description_class,
            price: req.body.price,
            id_category: req.body.id_category,
            link_class: req.body.link_class
        };
        db.query(`select * from category where id_category = ${data.id_category}`, (err, result) => {
            if (err) throw err;
            if (!result.length) res.json({ message: "category not found!" });
            if (req.file) {
                data.image_class = req.file.filename;
                db.query(`update class set ? where id_class = ${id}`, data, (err, result) => {
                    if (err) throw err;
                    res.json({
                        message: "Success updated data",
                    });
                }
                );
            } else {
                db.query(`update class set ? where id_class = ${id}`, data, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        res.json({
                            message: "data has been updated",
                        });
                    }
                }
                );
            }
        }
        );
    },

    //Delete class
    delete: (req, res) => {
        const id = req.params.id;
        db.query(`delete from class where id_class = ${id}`, (err, results) => {
            if ((null, err)) throw err;
            res.json({
                message: "Berhasil menghapus data",
                data: results,
            });
        });
    },


    //Search di page catalog detail
    find: (req, res) => {
        let find = req.body.find
        const id = req.params.id 
        let sql = "select * from class where name_class like '%" + find + "%' and id_category = ? "
        db.query(sql, id, (err, result) => {
            if (err) {
                throw err
            } else {
                
                res.json({
                  result, sql
                })
            }
        })
      },

};