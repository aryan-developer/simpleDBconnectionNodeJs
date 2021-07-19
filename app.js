const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const application = express();
const connection = mysql.createConnection(
    {
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "test"
    }
);
application.use("/img", express.static(path.join(__dirname, "/img")))
application.use(bodyParser.urlencoded({extended : false}))
application.set("views", "views");
application.set("view engine", "pug");
application.get("/", (req, res, next) => {
    try {
        let resp = null;
        connection.connect((err) => {});
        connection.query("SELECT * FROM members", (err, response) => {
            res.render("index", {search : false,data: response})
        })

    } catch (err) {
        next(err);
    }
})
application.post("/", (req, res, next) => {
    try {
        let resp = null;
        connection.connect((err) => {
        });
        console.log(req.body.name)
        connection.query("SELECT * FROM `members` WHERE `name` LIKE '%"+req.body.name+"%'", (err, response) => {
            res.render("index", {search : false,data: response})
        })
    } catch (err) {
        next(err);
    }
})
function start() {
    application.listen(8000)
}
module.exports = start;

