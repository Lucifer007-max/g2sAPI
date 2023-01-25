const express = require("express");
const route = express.Router(); 
const config = require('./setting'); 
var sql = require("mssql"); 

route.get('/courseGet', getCourses) 
module.exports = route;



// Course Get
async function getCourses(req, res) {
    try {
        let db = await sql.connect(config);
        let data = await db.request().query("select CourseTitle from Courses where isDeleted = 'false'");
        res.status(200).json({
            success: true,
            data: data.recordsets[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error : data not show"
        });
    }
}
