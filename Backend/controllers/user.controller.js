"use strict";

// import
const db = require("../database");
const md5 = require("md5");
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "COURSEWEBNODE"

// endpoint
module.exports = {
  getAll: (req, res) => {
    db.query(`select * from user`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Semua Data",
        data: results,
      });
    });
  },

  getId: (req, res) => {
    const id = req.params.id;
    db.query(`select * from user where id_user = '${id}'`, (err, results) => {
      const user = results[0]
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Data",
        data: user,
      });
    });
  },

  add: (req, res) => {
    let data = {
      name_user: req.body.name_user,
      address_user: req.body.address_user,
      level_user: "User",
      gender_user: req.body.gender_user,
      age_user: req.body.age_user,
      phone_user: req.body.phone_user,
      email_user: req.body.email_user,
      password_user: md5(req.body.password_user)
    }
    if ((!data.name_user, !data.email_user || !data.password_user)) {
      res.status(402).json({
        message: "Nama User, Username, dan Password Harus Diisi!",
      });
    }
    if(req.file){
      data.img_user = req.file.filename
      db.query(`insert into user set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }else{
      db.query(`insert into user set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }
  },

  update: (req, res) => {
    const id = req.params.id;
    let data = {
      name_user: req.body.name_user,
      address_user: req.body.address_user,
      level_user: "User",
      gender_user: req.body.gender_user,
      age_user: req.body.age_user,
      phone_user: req.body.phone_user,
      email_user: req.body.email_user,
    }
    if(req.file){
      data.img_user = req.file.filename
      db.query(`update user set ? where id_user = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }else{
      db.query(`update user set ? where id_user = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }
  },

  delete: (req, res) => {
    const id = req.params.id;
    db.query(`delete from user where id_user = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Data",
        data: results,
      });
    });
  },

  deleteProfile: (req, res) => {
    const id = req.params.id;
    let photo = ""
    db.query(`update user set img_user = '${photo}' where id_user = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Profile",
        data: results,
      });
    });
  },

  updatePw: (req, res) => {
    let email_user =  req.body.email_user
    let password_user = ""
    if(req.body.password_user){
      password_user =  md5(req.body.password_user)
    }
    db.query(`update user set password_user = '${password_user}' where email_user = '${email_user}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Ubah Password",
        data: results,
      });
    });
  },

  find: (req, res) => {
    let find = req.body.find
    let sql = "select * from user where name_user like '%" + find + "%' or id_user like '%" + find + "%' or address_user like '%" + find + "%' or gender_user like '%" + find + "%' or age_user like '%" + find + "%' or email_user like '%" + find + "%' or phone_user like '%" + find + "%' "
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            
            res.json({
              result
            })
        }
    })
  },

  login: (req, res) => {
    let email_user =  req.body.email_user
    let password_user = req.body.password_user

    if( !email_user || !password_user) res.status(402).json({message: "email dan password harus diisi."})

       db.query(`select * from user where email_user = '${email_user}'`, (err, result)=>{
        const user = result[0]
          if (typeof user === 'undefined'){
            res.json({message: "User not fond"})
          }else{
            if(user.password_user === md5(password_user)){
              const token = jwt.sign({data: user}, SECRET_KEY)
              res.json({
                logged: true,
                data: user,
                token: token
              })
            }else{
              res.json({
                message: "Invalid password"
              })
            }
            
          }
        })
  },

  pwUser: (req, res) => {
    let id_user = req.params.id_user;
    let password_user = "";
    if(req.body.password_user){
      password_user =  md5(req.body.password_user)
    }
    let query = `update user set password_user = '${password_user}' where id_user = '${id_user}'`
    db.query(
      query,
      (err, results) => {
        if ((null, err)) throw err;
        res.json({
          message: "Berhasil Ubah Password",
          data: results,
        });
      }
    );
  },
};
